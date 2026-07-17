import type { BillingCurrency, BillingPlanResponse, OrgFeature, OrgFeatureFlags, OrgTier, OrganizationTierConfigInput, PaidOrgTier, SelfServeBillingTier } from "./types.js";
export declare const ORG_NAME_MAX_LENGTH = 20;
type BillableOrgTier = Extract<OrgTier, "pro" | "team" | "enterprise">;
export interface OrgNameValidation {
    valid: boolean;
    /** The trimmed name. Only meaningful to persist when `valid` is true. */
    name: string;
    error?: string;
}
/**
 * Validate an organization name for both the API and the UI so the rules stay in one place.
 */
export declare function validateOrgName(rawName: unknown): OrgNameValidation;
export declare function isSuperglueInternalEmail(email?: string | null): boolean;
export declare const BILLING_CURRENCIES: readonly ["eur", "usd"];
export declare function isBillingCurrency(value: unknown): value is BillingCurrency;
export declare const PAID_ORG_TIERS: readonly ["pro", "team", "enterprise"];
export declare const SELF_SERVE_BILLING_TIERS: readonly ["pro", "team"];
export declare const ORG_FEATURES: readonly ["activity_tracking", "access_control", "organization_management", "custom_timeouts"];
export declare function isOrgTier(tier?: string | null): tier is OrgTier;
export declare function parseOrgTier(tier?: string | null): OrgTier | null;
export declare function normalizeOrgTier(tier?: string | null): OrgTier;
export declare function isPaidOrgTier(tier: OrgTier): tier is PaidOrgTier;
export declare function isSelfServeBillingTier(tier: OrgTier): tier is SelfServeBillingTier;
export declare function isSelfServeBillingPlan(plan: BillingPlanResponse): plan is BillingPlanResponse & {
    tier: SelfServeBillingTier;
};
export interface OrgFeatureMetadata {
    name: string;
    description: string;
    requiredTier: BillableOrgTier;
    gateMessage: string;
}
export declare const ORG_FEATURE_METADATA: Record<OrgFeature, OrgFeatureMetadata>;
export declare function getOrgFeatureMetadata(feature: OrgFeature): OrgFeatureMetadata;
export declare function createOrgFeatureFlags(enabled: boolean): OrgFeatureFlags;
export declare function cloneOrgFeatureFlags(features: OrgFeatureFlags): OrgFeatureFlags;
export declare const ORG_TIER_CONFIG_DEFAULTS: {
    trial: {
        tokenLimitPerUser: number;
        tokenLimitPeriod: "lifetime";
        runLimitPerUser: number;
        runLimitPeriod: "lifetime";
        maximumConcurrentRuns: number;
        features: OrgFeatureFlags;
    };
    pro: {
        tokenLimitPerUser: number;
        tokenLimitPeriod: "calendar_month";
        runLimitPerUser: number;
        runLimitPeriod: "calendar_month";
        maximumConcurrentRuns: number;
        features: {
            activity_tracking: false;
            access_control: false;
            organization_management: false;
            custom_timeouts: false;
        };
    };
    team: {
        tokenLimitPerUser: number;
        tokenLimitPeriod: "calendar_month";
        runLimitPerUser: number;
        runLimitPeriod: "calendar_month";
        maximumConcurrentRuns: any;
        features: {
            activity_tracking: true;
            access_control: false;
            organization_management: true;
            custom_timeouts: false;
        };
    };
    enterprise: {
        tokenLimitPerUser: any;
        tokenLimitPeriod: "calendar_month";
        runLimitPerUser: any;
        runLimitPeriod: "calendar_month";
        maximumConcurrentRuns: any;
        features: OrgFeatureFlags;
    };
};
export declare function getOrganizationTierConfigDefaults(tier: OrgTier): OrganizationTierConfigInput;
export declare function resolveOrgFeatureFlagsForTier(params: {
    tier: OrgTier;
    configuredFeatures?: OrgFeatureFlags | null;
}): OrgFeatureFlags;
export declare const ORGANIZATION_BILLING_METADATA_KEYS: {
    readonly customerId: "stripe_customer_id";
    readonly subscriptionId: "stripe_subscription_id";
    readonly subscriptionItemId: "stripe_subscription_item_id";
    readonly currency: "stripe_currency";
};
export interface OrganizationBillingMetadata {
    customerId: string | null;
    subscriptionId: string | null;
    subscriptionItemId: string | null;
    currency: BillingCurrency | null;
}
export interface OrganizationBillingMetadataPatch {
    customerId?: string | null;
    subscriptionId?: string | null;
    subscriptionItemId?: string | null;
    currency?: BillingCurrency | null;
}
export declare function mapOrganizationMetadataToBillingMetadata(metadata: Record<string, unknown>): OrganizationBillingMetadata;
export declare function mapBillingMetadataPatchToOrganizationMetadata(patch: OrganizationBillingMetadataPatch): Record<string, string | null>;
export {};
//# sourceMappingURL=organization-utils.d.ts.map