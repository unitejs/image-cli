/**
 * Main entry point.
 */
/// <reference path="./favicons.d.ts" />
import * as favicons from "favicons";
import { CLIBase } from "unitejs-cli-core/dist/cliBase";
import { CommandLineParser } from "unitejs-cli-core/dist/commandLineParser";
import { IDisplay } from "unitejs-framework/dist/interfaces/IDisplay";
import { IFileSystem } from "unitejs-framework/dist/interfaces/IFileSystem";
import { ILogger } from "unitejs-framework/dist/interfaces/ILogger";
import { CommandLineArgConstants } from "./commandLineArgConstants";
import { CommandLineCommandConstants } from "./commandLineCommandConstants";

//import { create, PhantomJS } from "phantom";

export class CLI extends CLIBase {
    private static APP_NAME: string = "UniteJS Image";
    private static DEFAULT_LOG: string = "unite-image.log";

    constructor() {
        super(CLI.APP_NAME, CLI.DEFAULT_LOG);
    }

    public async handleCustomCommand(logger: ILogger, display: IDisplay, fileSystem: IFileSystem, commandLineParser: CommandLineParser): Promise<number> {
        let ret: number = -1;

        const command = commandLineParser.getCommand();

        switch (command) {
            case CommandLineCommandConstants.SOME_COMMAND: {
                display.info(`command: ${command}`);
                const aParam = commandLineParser.getArgument(CommandLineArgConstants.A_PARAM);
                display.info("aParam", [aParam]);

                await this.invokeFavIcons(display, fileSystem);

                // display.info("Loading PhantomJS");
                // const phantom = await create();
                // display.info("Creating Page");
                // const page = await phantom.createPage();
                // display.info("Creating Page");
                // const content = "<html><style>body { background-color:#FFF; }</style><body>This is some text<br/><img src=\"file:///D:/Workarea/unitejs/web/assets/logo/logo.svg\"/></body></html>";
                // await page.property("viewportSize", {width:1440,height:900});
                // await page.property("content", content);

                // // const status = await page.open("file:///D:/Workarea/unitejs/web/assets/logo/logot.svg");
                // // display.info("Status", [ status ]);

                // //if (status === "success") {
                //     await page.render("D:\\unite\\test.png");
                //     // const base64Image = await page.renderBase64("PNG");
                //     // display.info("Base64", [ base64Image ]);
                // //}

                // display.info("Exiting PhantomJS");
                // phantom.exit();

                ret = 0;
            }
        }

        return ret;
    }

    public displayHelp(display: IDisplay): number {
        display.diagnostics("Commands");
        display.info("  help, version, someCommand");
        display.info("");

        display.diagnostics("someCommand");
        display.info("");
        this.markdownTableToCli(display, "| aParam              | plain text                                   | A parameter for something                        |");
        display.info("");

        display.diagnostics("More Information");
        display.info("");
        display.info("  See https://github.com/unitejs/image-cli#readme for further details.");

        return 0;
    }

    private async invokeFavIcons(display: IDisplay, fileSystem: IFileSystem): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            favicons("D:/unite/logob.svg",
                     {
                    appName: "testApp",
                    appDescription: "some description",
                    developerName: "obany",
                    developerURL: "www.obany.com",
                    background: "#F00",
                    path: "./assets/favicons",
                    display: "browser",
                    orientation: "portrait",
                    start_url: "/?homescreen=1",
                    version: 1,
                    logging: true,
                    online: false,
                    preferOnline: false
                },   (error, response) => {

                    if (error) {
                        display.log(error.status);  // HTTP error code (e.g. `200`) or `null`
                        display.log(error.name);    // Error name e.g. "API Error"
                        display.log(error.message); // Error description e.g. "An unknown error has occurred"
                        return;
                    }
                    /* tslint:disable*/
                    // console.log(response.images);   // Array of { name: string, contents: <buffer> }
                    // console.log(response.files);    // Array of { name: string, contents: <string> }
                    // console.log(response.html);     // Array of strings (html elements)

                    const promises: Promise<any>[] = [];
                    for(let i = 0; i < response.images.length; i++) {
                        promises.push(fileSystem.fileWriteBinary("d:\\unite\\favicon\\", response.images[i].name, response.images[i].contents));
                    }
                    for(let i = 0; i < response.files.length; i++) {
                        promises.push(fileSystem.fileWriteBinary("d:\\unite\\favicon\\", response.files[i].name, response.files[i].contents));
                    }
                    promises.push(fileSystem.fileWriteLines("d:\\unite\\favicon\\", "meta.html", response.html));

                    Promise.all(promises)
                    .then(() => resolve());
                });

        });
    }
}
