# SuiteCloud

The `suitecloud://` protocol changes NetSuite account structure: custom fields, custom record types, custom lists, forms, workflows, saved searches, roles, and scripts. The NetSuite REST API and SuiteScript cannot create these. It deploys SuiteCloud projects (SDF) to the account. Use it on the NetSuite system, next to its HTTP steps.

## Step Configuration

```typescript
{
  type: "request",
  systemId: "netsuite",
  url: "suitecloud://1234567-sb1.app.netsuite.com",
  body: '{"operation": "validate", "files": {"Objects/custentity_sg_contract_end.xml": "<entitycustomfield ...>"}}'
}
```

`method`, `headers`, `queryParams`, and `pagination` are HTTP-only fields. Omit them.

Every operation also runs as a single call:

```bash
sg system call --system-id netsuite \
  --url "suitecloud://1234567-sb1.app.netsuite.com" \
  --body '{"operation": "listObjects", "objectTypes": ["entitycustomfield"]}'
```

### Fields

| Field      | Required   | Notes                                                                                                    |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| `url`      | yes        | `suitecloud://<account>.app.netsuite.com`. No path, port, or credentials.                                |
| `body`     | yes        | JSON string with `operation` and the operation's inputs                                                  |
| `systemId` | yes        | The NetSuite system. Its OAuth sign-in is used for the login.                                            |
| `modify`   | tool steps | `false` for reads, `true` for `deploy`. `deploy` changes the live account. `sg system call` has no flag. |

`<account>` is the account ID in host form: lowercase, with `_` written as `-` (`1234567_SB1` becomes `1234567-sb1`). It is the same prefix as the host of the system's REST URL.

### Login

The step logs in with the system's NetSuite OAuth token, the same one the REST steps use. It runs as the user and role that connected NetSuite. The role needs the permissions **Log in using OAuth 2.0 Access Tokens**, **REST Web Services**, and **SuiteCloud Development Framework**; the standard Developer role has them. The integration record needs **REST Web Services** and **RESTlets** checked, and the sign-in needs the scopes `rest_webservices` and `restlets`. Nothing else is stored on the credential.

## Operations

| Operation       | Inputs                                                      | Result                                                                     |
| --------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------- |
| `listObjects`   | optional `objectTypes` (array), `scriptIdContains`          | Custom objects in the account: type and script ID                          |
| `importObjects` | `objectType`, `scriptIds` (array)                           | `files`: map of `Objects/<scriptid>.xml` to XML, plus `data.failedImports` |
| `validate`      | `files`                                                     | NetSuite's validation of the project. Changes nothing.                     |
| `preview`       | `files`                                                     | The changes a deploy would make. Changes nothing.                          |
| `deploy`        | `files`, step `modify: true`                                | Applies the project to the account                                         |
| `callRestlet`   | `scriptId`, `deployId`, optional `method`, `params`, `body` | The JSON response of the RESTlet                                           |

A failed operation fails the step with NetSuite's error messages. `importObjects` succeeds as long as NetSuite answers: each object that could not be exported is listed in `data.failedImports` with NetSuite's message, and `files` holds only the exported ones. Objects locked by an installed bundle or SuiteApp fail with "You cannot download the XML file for this object because it is locked", and some workflows fail with "Inconsistent workflow data". `listObjects` does not show which objects are locked; `appId` is `null` for them too. When an import returns no files, pick another object of the same type.

## Project Files

`files` maps a project path to the file content. Paths are relative and must stay inside the project.

| Path                           | Content                                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `Objects/<scriptid>.xml`       | One custom object. The file name must equal the object's `scriptid`.                                                           |
| `FileCabinet/SuiteScripts/<f>` | Script and other File Cabinet files                                                                                            |
| `manifest.xml`                 | NetSuite requires it. When you leave it out, the step adds one that declares the features its objects need (see below).        |
| `deploy.xml`                   | NetSuite requires it. When you leave it out, the step adds Oracle's default: `~/FileCabinet/SuiteScripts/*` and `~/Objects/*`. |

In `deploy.xml`, each `path` starts with `~` (the project root), is case-sensitive, and can use `*` for all files in a folder. The element order is `configuration`, `files`, `objects`, and NetSuite processes the paths in sequence. Supply your own `deploy.xml` for files outside `FileCabinet/SuiteScripts/`. A project with files only in other folders fails without one.

NetSuite refuses a project whose objects need a feature the manifest does not declare. The default manifest adds `SERVERSIDESCRIPTING` for server script objects (`restlet`, `suitelet`, `usereventscript`, `scheduledscript`, `mapreducescript`, `workflowactionscript`, `massupdatescript`, `portlet`, `bundleinstallationscript`) and `WORKFLOW` for a `workflow`, read from each object's root element. Client scripts and custom record types need no feature. Supply your own `manifest.xml` when validation names another feature:

```xml
<manifest projecttype="ACCOUNTCUSTOMIZATION">
  <projectname>superglue</projectname>
  <frameworkversion>1.0</frameworkversion>
  <dependencies>
    <features>
      <feature required="true">CUSTOMRECORDS</feature>
    </features>
  </dependencies>
</manifest>
```

Example object, a date field on customers:

```xml
<entitycustomfield scriptid="custentity_sg_contract_end">
  <label>Contract End Date</label>
  <fieldtype>DATE</fieldtype>
  <appliestocustomer>T</appliestocustomer>
  <storevalue>T</storevalue>
</entitycustomfield>
```

Each object type has a fixed script ID prefix, for example `custentity_` (entity field), `custbody_` (transaction body field), `custcol_` (transaction line field), `custitem_` (item field), `customrecord_` (record type), `custrecord_` (field on a custom record type), `customlist_` (list), `customsearch_` (saved search), `customworkflow_` (workflow), `customscript_` (script), `customdeploy_` (script deployment). Oracle's XML reference lists every type and field: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/SDFxml.html

## Workflow

1. `listObjects` to see what exists.
2. `importObjects` for one existing object of the type you need. Use its XML as the pattern. Do not write an unfamiliar object type from memory.
3. Write the files and run `validate`. Fix every error and repeat.
4. Run `preview` and show the user the planned changes.
5. Run `deploy`. In a saved tool, set `modify: true` on the step.
6. Verify the result with SuiteQL or `listObjects`.

## Workflow Objects

Source: Oracle's SDF XML reference for the `workflow` object (https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/SDFxml_2086367724.html) and "Workflows as XML Definitions". Full example: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1506974279.html

A workflow (SuiteFlow) is one file, `Objects/customworkflow_<name>.xml`, with the root element `<workflow scriptid="customworkflow_<name>">`. A `scriptid` can have up to 40 characters. The object depends on the `WORKFLOW` feature, and the SuiteFlow feature must be on in the account. When a value needs a feature that the manifest does not list, the validation log names the feature.

| Field                                               | Required | Values and default                                                                                                    |
| --------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `name`                                              | yes      |                                                                                                                       |
| `recordtypes`                                       | yes      | Standard record type, `[scriptid=customrecord_x]`, or a custom transaction type. Separate several values with a pipe. |
| `releasestatus`                                     | no       | `NOTINITIATING` (default), `TESTING`, `RELEASED`, `SUSPENDED`. `NOTRUNNING` is the old name of `NOTINITIATING`.       |
| `keephistory`                                       | no       | `ONLYWHENTESTING` (default), `ALWAYS`, `NEVER`                                                                        |
| `initoncreate`, `initonvieworupdate`                | no       | `T` or `F` (default)                                                                                                  |
| `inittriggertype`                                   | no       | `BEFORELOAD`, `BEFORESUBMIT`, `AFTERSUBMIT`                                                                           |
| `initsavedsearchcondition`, `initsavedsearchfilter` | no       | Saved search reference                                                                                                |
| `isinactive`, `islogenabled`, `runasadmin`          | no       | `T` or `F` (default)                                                                                                  |
| `description`, `initcontexts`, `initeventtypes`     | no       |                                                                                                                       |

Structured fields of `workflow`: `initcondition`, `recurrence` (for a schedule, with dates and times in UTC and ISO format), `workflowcustomfields`, and `workflowstates`.

States hold the logic. This block is shortened from Oracle's example, which lists more fields for each action and transition:

```xml
<workflowstates>
  <workflowstate scriptid="workflowstate_entry">
    <name>State 1: Entry</name>
    <donotexitworkflow>F</donotexitworkflow>
    <workflowactions triggertype="ONENTRY">
      <setfieldvalueaction scriptid="workflowaction_setpendingvalue">
        <field>[scriptid=custbody_approvalstatus]</field>
        <valuetype>STATIC</valuetype>
      </setfieldvalueaction>
    </workflowactions>
    <workflowtransitions>
      <workflowtransition scriptid="workflowtransition_hassupervisor">
        <tostate>[scriptid=customworkflow_approvals.workflowstate_approvalpending]</tostate>
        <triggertype>ONENTRY</triggertype>
      </workflowtransition>
    </workflowtransitions>
  </workflowstate>
</workflowstates>
```

- `workflowstate`: `scriptid` and `name` are required. Optional: `description`, `donotexitworkflow`, `positionx`, `positiony`. Structured fields: `workflowactions`, `workflowstatecustomfields`, `workflowtransitions`.
- `workflowactions` can occur several times in a state. Its `triggertype` attribute is required: `ONENTRY`, `ONEXIT`, `BEFORELOAD`, `BEFORESUBMIT`, `AFTERSUBMIT`, `SCHEDULED`, `BEFOREUSEREDIT`, `BEFOREFIELDEDIT`, `AFTERFIELDEDIT`, `AFTERFIELDSOURCING`, or `BEFOREUSERSUBMIT`.
- Action elements: `addbuttonaction`, `removebuttonaction`, `confirmaction`, `showmessageaction`, `returnusererroraction`, `setfieldvalueaction`, `setfieldmandatoryaction`, `setdisplaylabelaction`, `setdisplaytypeaction`, `lockrecordaction`, `createrecordaction`, `createlineaction`, `transformrecordaction`, `gotorecordaction`, `gotopageaction`, `sendemailaction`, `sendcampaignemailaction`, `subscribetorecordaction`, `initiateworkflowaction`, `customaction`. Groups: `workflowactiongroup`, `workflowsublistactiongroup`. Each action needs its own `scriptid`.
- `workflowtransition`: `scriptid` and `tostate` are required. Optional: `triggertype` (`ONENTRY`, `BEFORELOAD`, `BEFORESUBMIT`, `AFTERSUBMIT`, `SCHEDULED`), `buttonaction` (a reference to an `addbuttonaction`), `conditionsavedsearch`, `contexttypes`, `eventtypes`, `scheduledelay`, `scheduletimeunit`, `waitforworkflow`, `waitforworkflowstate`, and `initcondition`.
- References use the full script ID path. State: `[scriptid=customworkflow_approvals.workflowstate_approved]`. Button: `[scriptid=customworkflow_approvals.workflowstate_approvalpending.workflowaction_approvebutton]`. Custom field: `[scriptid=custbody_approvalstatus]`. Standard fields use codes such as `STDBODYSALESREP`.

Conditions (`initcondition`) have a required `type`, an optional `formula`, and optional `parameters`:

- `FORMULA`: the `formula` element holds the text in `CDATA`, for example `<![CDATA[{supervisor} is not null]]>`.
- `VISUAL_BUILDER`: the formula uses quoted names, and the `parameters` list gives each name a `value`. Each `name` must appear in the formula. Oracle says to build complex conditions in the NetSuite UI and import the workflow, not to write them by hand.
- To delete a condition, deploy it with an empty `formula`. Removing the `initcondition` block does not delete it in the account.
- Imported workflows can contain `[ACCOUNT_SPECIFIC_VALUE]`. Replace each one with a valid value before a deploy.

Oracle's example deploys three files together: the workflow, the custom list it uses (`customlist_approvalstatuses`), and the transaction body field that uses the list (`custbody_approvalstatus`).

## Preferences and Other SuiteScript-Only Changes

Some changes need SuiteScript that runs inside NetSuite, for example company and accounting preferences (`N/config`). A deploy cannot make these changes, but it can install the script that does:

1. Deploy a RESTlet with a `suitecloud://` deploy. The project needs the script file under `FileCabinet/SuiteScripts/` and a `restlet` object under `Objects/`. The deployment `status` is `TESTING` by default, which runs the script for the script owner and the specified audience. `RELEASED` runs it for all specified audience members. The audience fields include `allroles`, `audslctrole`, and `allemployees`. Deploy with `status` `TESTING` and `allemployees` `T` first and call it; switch to `RELEASED` with an explicit audience after it works. NetSuite can drop audience flags on the first deploy of a script, so import the script object after the deploy and check the stored deployment before you call it. Import an existing RESTlet with `importObjects` and use it as the pattern.
2. Call the RESTlet with the `callRestlet` operation and the script ID and deployment ID from the project, for example `customscript_sg_prefs` and `customdeploy_sg_prefs`. `method` selects the RESTlet entry point: `POST` (default) and `PUT` send `body` as JSON; `GET` and `DELETE` send `params` as query parameters and take no `body`. `params` is an object of string, number, or boolean values and is added to the URL for every method. An empty or `null` response means the RESTlet has no entry point for that method. A RESTlet has 5,000 governance units per call. NetSuite stops the script with `SSS_USAGE_LIMIT_EXCEEDED` when they run out, so keep each call small and check `runtime.getCurrentScript().getRemainingUsage()` in loops.

Read the current value before you change it, and tell the user when a setting cannot be undone.

## Common Pitfalls

- A deploy adds and updates objects. It never deletes them. Removing an object needs the NetSuite UI.
- Some changes cannot be undone, for example enabling a feature or changing a field's type after data exists. Tell the user before the deploy.
- The file name and the `scriptid` attribute must match, and the prefix must fit the object type.
- A script object needs `name`, `scriptfile`, and `scriptdeployments`. `scriptfile` must be a `.js` file, written as `[/SuiteScripts/<file>.js]`. Each `scriptdeployment` needs `status`; server script deployments also need `title`, which client script deployments ignore. Script IDs start with `customscript_` and deployment IDs with `customdeploy_`. Oracle's RESTlet example: https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_160514060027.html
- Preferences such as accounting preferences are not project objects. A deploy cannot set them. Use the RESTlet route above.
- Deploy to a sandbox account first when the user has one.
- A sandbox refresh removes the sign-in. The user reconnects NetSuite in superglue after each refresh.

## Error Recovery

1. **"SuiteCloud needs the NetSuite OAuth sign-in"**: the system has no OAuth token. The user connects NetSuite with OAuth first. Link the setup guide https://superglue.ai/docs/guides/netsuite-suitecloud/ and stop.
2. **401 or "Invalid login attempt"**: the token has expired or the sign-in lacks a scope. NetSuite refresh tokens last seven days, so the user reconnects NetSuite in superglue. If the `restlets` scope is missing, the user reconnects after the scope was added. NetSuite records the failure detail in the Login Audit Trail under **Setup > Users/Roles > User Management > View Login Audit Trail**.
3. **Validation errors**: read each message. "The manifest must define the X feature as required" means add `<feature required="true">X</feature>` to `manifest.xml`. For other errors, compare the XML with an imported object of the same type.
4. **Permission errors on validate, preview, or deploy**: report NetSuite's message to the user verbatim.
5. **`INSUFFICIENT_PERMISSION` from `callRestlet`**: the deployment's audience does not include the connected user and role. Import the script object to see the stored `status` and audience, then redeploy with `status` `TESTING` and `allemployees` `T`.
6. **429, `CONCURRENCY_LIMIT_EXCEEDED`, or `SSS_REQUEST_LIMIT_EXCEEDED`**: the account's concurrency limit is in use. NetSuite allows 15 concurrent requests by default, shared by REST, SOAP, and RESTlets, and rejects extra requests instead of queuing them. Run NetSuite steps one after another and retry after a short wait.
7. **`SSS_USAGE_LIMIT_EXCEEDED` from `callRestlet`**: the RESTlet used its 5,000 governance units. Split the work into smaller calls.
