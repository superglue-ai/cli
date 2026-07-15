import type { HtmlArtifact } from "./types.js";
export declare const PORTABLE_HTML_ARTIFACT_VERSION = 1;
export declare const HTML_ARTIFACT_PERMISSIONS_POLICY = "accelerometer 'none'; autoplay 'none'; camera 'none'; clipboard-read 'none'; clipboard-write 'none'; display-capture 'none'; encrypted-media 'none'; fullscreen 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-get 'none'; screen-wake-lock 'none'; serial 'none'; usb 'none'; web-share 'none'; xr-spatial-tracking 'none'";
export declare function buildPortableHtmlArtifactDocument({ artifact, }: {
    artifact: HtmlArtifact;
}): string;
//# sourceMappingURL=html-artifact-wrapper.d.ts.map