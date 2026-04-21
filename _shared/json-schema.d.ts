import { JSONSchema4, JSONSchema4TypeName } from "json-schema";
export interface JSONSchema3or4 {
    id?: JSONSchema4["id"] | undefined;
    $ref?: JSONSchema4["$ref"] | undefined;
    $schema?: JSONSchema4["$schema"] | undefined;
    title?: JSONSchema4["title"] | undefined;
    description?: JSONSchema4["description"] | undefined;
    default?: JSONSchema4["default"] | undefined;
    multipleOf?: JSONSchema4["multipleOf"] | undefined;
    /** JSON Schema 3 uses `divisibleBy` instead of `multipleOf`. */
    divisibleBy?: JSONSchema4["multipleOf"] | undefined;
    maximum?: JSONSchema4["maximum"] | undefined;
    exclusiveMaximum?: JSONSchema4["exclusiveMaximum"] | undefined;
    minimum?: JSONSchema4["minimum"] | undefined;
    exclusiveMinimum?: JSONSchema4["exclusiveMinimum"] | undefined;
    maxLength?: JSONSchema4["maxLength"] | undefined;
    minLength?: JSONSchema4["minLength"] | undefined;
    pattern?: JSONSchema4["pattern"] | undefined;
    additionalItems?: boolean | JSONSchema3or4 | undefined;
    items?: JSONSchema3or4 | JSONSchema3or4[] | undefined;
    maxItems?: JSONSchema4["maxItems"] | undefined;
    minItems?: JSONSchema4["minItems"] | undefined;
    uniqueItems?: JSONSchema4["uniqueItems"] | undefined;
    maxProperties?: JSONSchema4["maxProperties"] | undefined;
    minProperties?: JSONSchema4["minProperties"] | undefined;
    required?: boolean | JSONSchema4["required"] | undefined;
    additionalProperties?: boolean | JSONSchema3or4 | undefined;
    definitions?: JSONSchema4["definitions"] | undefined;
    properties?: {
        [k: string]: JSONSchema3or4;
    } | undefined;
    patternProperties?: {
        [k: string]: JSONSchema3or4;
    } | undefined;
    dependencies?: {
        [k: string]: JSONSchema3or4 | string | string[];
    } | undefined;
    enum?: JSONSchema4["enum"] | undefined;
    type?: JSONSchema4["type"] | undefined;
    allOf?: JSONSchema4["allOf"] | undefined;
    anyOf?: JSONSchema4["anyOf"] | undefined;
    oneOf?: JSONSchema4["oneOf"] | undefined;
    not?: JSONSchema4["not"] | undefined;
    /** JSON Schema 3 only */
    disallow?: string | Array<string | JSONSchema3or4> | undefined;
    extends?: JSONSchema3or4 | JSONSchema3or4[] | undefined;
    [k: string]: any;
    format?: string | undefined;
}
interface Options {
    required?: boolean | undefined;
    requiredDepth?: number | undefined;
    postProcessFnc?(type: JSONSchema4TypeName, schema: JSONSchema3or4, value: any, defaultFunc: (type: JSONSchema4TypeName, schema: JSONSchema3or4, value: any) => JSONSchema3or4): JSONSchema3or4;
    arrays?: {
        mode?: "all" | "first" | "uniform" | "tuple" | undefined;
    } | undefined;
    objects?: {
        preProcessFnc?(obj: any, defaultFunc: (obj: any) => JSONSchema3or4): JSONSchema3or4;
        postProcessFnc?(schema: JSONSchema3or4, obj: any, defaultFnc: (schema: JSONSchema3or4, obj: any) => JSONSchema3or4): JSONSchema3or4;
        additionalProperties?: boolean | undefined;
    } | undefined;
    strings?: {
        preProcessFnc?(value: string, defaultFnc: (value: string) => JSONSchema3or4): JSONSchema3or4;
    } | undefined;
}
export declare function toJsonSchema(value: any, options?: Options): JSONSchema3or4;
export declare function convertRequiredToArray(schema: any): any;
export declare function generateDefaultFromSchema(schema: any): any;
export declare function parseJsonSafe(value: any): any;
export declare function normalizeToolSchemas<T extends {
    inputSchema?: any;
    outputSchema?: any;
    responseSchema?: any;
}>(tool: T): T;
export {};
//# sourceMappingURL=json-schema.d.ts.map