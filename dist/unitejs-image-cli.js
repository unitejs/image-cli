"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main entry point.
 */
/// <reference path="./favicons.d.ts" />
const favicons = require("favicons");
const cliBase_1 = require("unitejs-cli-core/dist/cliBase");
const commandLineArgConstants_1 = require("./commandLineArgConstants");
const commandLineCommandConstants_1 = require("./commandLineCommandConstants");
//import { create, PhantomJS } from "phantom";
class CLI extends cliBase_1.CLIBase {
    constructor() {
        super(CLI.APP_NAME, CLI.DEFAULT_LOG);
    }
    handleCustomCommand(logger, display, fileSystem, commandLineParser) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = -1;
            const command = commandLineParser.getCommand();
            switch (command) {
                case commandLineCommandConstants_1.CommandLineCommandConstants.SOME_COMMAND: {
                    display.info(`command: ${command}`);
                    const aParam = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.A_PARAM);
                    display.info("aParam", [aParam]);
                    yield this.invokeFavIcons(display, fileSystem);
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
        });
    }
    displayHelp(display) {
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
    invokeFavIcons(display, fileSystem) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                favicons("D:/unite/logob.svg", {
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
                }, (error, response) => {
                    if (error) {
                        display.log(error.status); // HTTP error code (e.g. `200`) or `null`
                        display.log(error.name); // Error name e.g. "API Error"
                        display.log(error.message); // Error description e.g. "An unknown error has occurred"
                        return;
                    }
                    /* tslint:disable*/
                    // console.log(response.images);   // Array of { name: string, contents: <buffer> }
                    // console.log(response.files);    // Array of { name: string, contents: <string> }
                    // console.log(response.html);     // Array of strings (html elements)
                    const promises = [];
                    for (let i = 0; i < response.images.length; i++) {
                        promises.push(fileSystem.fileWriteBinary("d:\\unite\\favicon\\", response.images[i].name, response.images[i].contents));
                    }
                    for (let i = 0; i < response.files.length; i++) {
                        promises.push(fileSystem.fileWriteBinary("d:\\unite\\favicon\\", response.files[i].name, response.files[i].contents));
                    }
                    promises.push(fileSystem.fileWriteLines("d:\\unite\\favicon\\", "meta.html", response.html));
                    Promise.all(promises)
                        .then(() => resolve());
                });
            });
        });
    }
}
CLI.APP_NAME = "UniteJS Image";
CLI.DEFAULT_LOG = "unite-image.log";
exports.CLI = CLI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91bml0ZWpzLWltYWdlLWNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCx3Q0FBd0M7QUFDeEMscUNBQXFDO0FBQ3JDLDJEQUF3RDtBQUt4RCx1RUFBb0U7QUFDcEUsK0VBQTRFO0FBRTVFLDhDQUE4QztBQUU5QyxTQUFpQixTQUFRLGlCQUFPO0lBSTVCO1FBQ0ksS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFWSxtQkFBbUIsQ0FBQyxNQUFlLEVBQUUsT0FBaUIsRUFBRSxVQUF1QixFQUFFLGlCQUFvQzs7WUFDOUgsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFckIsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFL0MsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDZCxLQUFLLHlEQUEyQixDQUFDLFlBQVksRUFBRSxDQUFDO29CQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDcEMsTUFBTSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGlEQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5RSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBRWpDLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBRS9DLHFDQUFxQztvQkFDckMsa0NBQWtDO29CQUNsQyxpQ0FBaUM7b0JBQ2pDLDJDQUEyQztvQkFDM0MsaUNBQWlDO29CQUNqQyx1TEFBdUw7b0JBQ3ZMLGdFQUFnRTtvQkFDaEUsMkNBQTJDO29CQUUzQyw4RkFBOEY7b0JBQzlGLHlDQUF5QztvQkFFekMsZ0NBQWdDO29CQUNoQyxnREFBZ0Q7b0JBQ2hELDZEQUE2RDtvQkFDN0Qsa0RBQWtEO29CQUNsRCxNQUFNO29CQUVOLHFDQUFxQztvQkFDckMsa0JBQWtCO29CQUVsQixHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNaLENBQUM7WUFDTCxDQUFDO1lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7S0FBQTtJQUVNLFdBQVcsQ0FBQyxPQUFpQjtRQUNoQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLDJIQUEySCxDQUFDLENBQUM7UUFDOUosT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVqQixPQUFPLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLHdFQUF3RSxDQUFDLENBQUM7UUFFdkYsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFYSxjQUFjLENBQUMsT0FBaUIsRUFBRSxVQUF1Qjs7WUFDbkUsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU07Z0JBQ3JDLFFBQVEsQ0FBQyxvQkFBb0IsRUFDcEI7b0JBQ0QsT0FBTyxFQUFFLFNBQVM7b0JBQ2xCLGNBQWMsRUFBRSxrQkFBa0I7b0JBQ2xDLGFBQWEsRUFBRSxPQUFPO29CQUN0QixZQUFZLEVBQUUsZUFBZTtvQkFDN0IsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLE9BQU8sRUFBRSxTQUFTO29CQUNsQixXQUFXLEVBQUUsVUFBVTtvQkFDdkIsU0FBUyxFQUFFLGdCQUFnQjtvQkFDM0IsT0FBTyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLElBQUk7b0JBQ2IsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsWUFBWSxFQUFFLEtBQUs7aUJBQ3RCLEVBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUTtvQkFFakIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFLHlDQUF5Qzt3QkFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBSSw4QkFBOEI7d0JBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMseURBQXlEO3dCQUNyRixNQUFNLENBQUM7b0JBQ1gsQ0FBQztvQkFDRCxtQkFBbUI7b0JBQ25CLG1GQUFtRjtvQkFDbkYsbUZBQW1GO29CQUNuRixzRUFBc0U7b0JBRXRFLE1BQU0sUUFBUSxHQUFtQixFQUFFLENBQUM7b0JBQ3BDLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDN0MsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDNUgsQ0FBQztvQkFDRCxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQzVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzFILENBQUM7b0JBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLHNCQUFzQixFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFFN0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7eUJBQ3BCLElBQUksQ0FBQyxNQUFNLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxDQUFDO1lBRVgsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7O0FBN0djLFlBQVEsR0FBVyxlQUFlLENBQUM7QUFDbkMsZUFBVyxHQUFXLGlCQUFpQixDQUFDO0FBRjNELGtCQStHQyIsImZpbGUiOiJ1bml0ZWpzLWltYWdlLWNsaS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMifQ==
