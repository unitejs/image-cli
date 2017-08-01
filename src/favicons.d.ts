/**
 * TypeScript definitions for Favicons
 * https://github.com/evilebottnawi/favicons
 */
declare module "favicons" {
    namespace favicons {
        type BackgroundType = boolean | string;

        interface IConfigIcons {
            // Platform Options:
            // - offset - offset in percentage
            // - shadow - drop shadow for Android icons, available online only
            // - background:
            //   * false - use default
            //   * true - force use default, e.g. set background for Android icons
            //   * color - set background for the specified icons
            //
            android?: boolean | { offset: number; background: BackgroundType; shadow: string }; // Create Android homescreen icon.
            appleIcon?: boolean | { offset: number; background: BackgroundType };               // Create Apple touch icons.
            appleStartup?: boolean | { offset: number; background: BackgroundType };            // Create Apple startup images.
            coast?: boolean | { offset: number; background: BackgroundType };                   // Create Opera Coast icon with offset 25%.
            favicons?: boolean;                                                                 // Create regular favicons.
            firefox?: boolean | { offset: number; background: BackgroundType };                 // Create Firefox OS icons.
            windows?: boolean | { background: BackgroundType };                                 // Create Windows 8 tile icons.
            yandex?: boolean | { background: BackgroundType };                                  // Create Yandex browser icon.
        }

        interface IConfig {
            appName?: string;                         // Your application's name.
            appDescription?: string;                  // Your application's description.
            developerName?: string;                   // Your (or your developer's) name.
            developerURL?: string;                    // Your (or your developer's) URL.
            background?: string;                      // Background colour for flattened icons.
            "theme_color"?: string;                   // Theme color for browser chrome.
            path?: string;                            // Path for overriding default icons path.
            display?: "browser" | "standalone";       // Android display: "browser" or "standalone".
            orientation?: "portrait" | "landscape";   // Android orientation: "portrait" or "landscape".
            "start_url"?: string;                     // Android start application's URL.
            version?: number;                         // Your application's version number.
            logging?: boolean;                        // Print logs to console?
            online?: boolean;                         // Use RealFaviconGenerator to create favicons?
            preferOnline?: boolean;                   // Use offline generation, if online generation has failed.
            icons?: IConfigIcons;
        }

        interface IError {
            status: string;                          // HTTP error code (e.g. `200`) or `null`
            name: string;                            // Error name e.g. "API Error"
            message: string;                         // Error description e.g. "An unknown error has occurred"
        }

        interface IResponse {
            images: { name: string; contents: Uint8Array }[];   // Array of { name: string, contents: <buffer> }
            files: { name: string; contents: string }[]; // Array of { name: string, contents: <string> }
            html: string[];                              // Array of strings (html elements)
        }

    }

    function favicons(source: string | string[] | any, parameters: favicons.IConfig, next: (error: favicons.IError, response: favicons.IResponse) => void): void;

    export = favicons;
}
