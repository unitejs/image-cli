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
const cliBase_1 = require("unitejs-cli-core/dist/cliBase");
const ico_1 = require("unitejs-image/dist/ico");
const svg_1 = require("unitejs-image/dist/svg");
const commandLineArgConstants_1 = require("./commandLineArgConstants");
const commandLineCommandConstants_1 = require("./commandLineCommandConstants");
class CLI extends cliBase_1.CLIBase {
    constructor() {
        super(CLI.APP_NAME, CLI.DEFAULT_LOG);
    }
    handleCustomCommand(logger, display, fileSystem, commandLineParser) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = -1;
            const command = commandLineParser.getCommand();
            switch (command) {
                case commandLineCommandConstants_1.CommandLineCommandConstants.SVG_TO_PNG: {
                    display.info(`command: ${command}`);
                    const sourceFile = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FILE);
                    const destFile = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.DEST_FILE);
                    const width = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.WIDTH);
                    const height = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.HEIGHT);
                    const margin = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.MARGIN);
                    const background = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.BACKGROUND);
                    const svg = new svg_1.SVG();
                    ret = yield svg.toPng(display, fileSystem, fileSystem.pathGetDirectory(sourceFile), fileSystem.pathGetFilename(sourceFile), fileSystem.pathGetDirectory(destFile), fileSystem.pathGetFilename(destFile), width, height, margin, background);
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.SVG_TO_MASK: {
                    display.info(`command: ${command}`);
                    const sourceFile = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FILE);
                    const destFile = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.DEST_FILE);
                    const mask = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.MASK);
                    const svg = new svg_1.SVG();
                    ret = yield svg.toMask(display, fileSystem, fileSystem.pathGetDirectory(sourceFile), fileSystem.pathGetFilename(sourceFile), fileSystem.pathGetDirectory(destFile), fileSystem.pathGetFilename(destFile), mask);
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.PNGS_TO_ICO: {
                    display.info(`command: ${command}`);
                    const sourceFolder = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FOLDER);
                    const sourceFiles = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FILES);
                    const destFile = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.DEST_FILE);
                    const ico = new ico_1.ICO();
                    ret = yield ico.fromPngs(display, fileSystem, sourceFolder, sourceFiles ? sourceFiles.split(",") : [], fileSystem.pathGetDirectory(destFile), fileSystem.pathGetFilename(destFile));
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
}
CLI.APP_NAME = "UniteJS Image";
CLI.DEFAULT_LOG = "unite-image.log";
exports.CLI = CLI;
// await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "android-chrome-192x192.png", 192, 192, 10, "#339933");
// await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2", "/android-chrome-512x512.png", 512, 512, 10, "#339933");
// await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "apple-touch-icon.png", 180, 180, 10, "#339933");
// await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "mstile-70x70.png", 128, 128, 10, "");
// await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "mstile-144x144.png", 144, 144, 0, "");
// await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "mstile-150x150.png", 270, 270, 50, "");
// await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "mstile-310x150.png", 558, 270, 50, "");
// await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo-transparent.svg", "D:/unite/favicon/favicons2/", "mstile-310x310.png", 558, 558, 50, "");
// await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo.svg", "D:/unite/favicon/favicons2/", "favicon-16x16.png", 16, 16, 0, "");
// await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo.svg", "D:/unite/favicon/favicons2/", "favicon-32x32.png", 32, 32, 0, "");
// await this.svgToPng(display, fileSystem, page, "D:/unite/favicon/", "logo.svg", "D:/unite/favicon/favicons2/", "favicon-48x48.png", 48, 48, 0, "");
// await this.pngToIco(display, fileSystem, ["D:/unite/favicon/favicons2/favicon-16x16.png",
//     "D:/unite/favicon/favicons2/favicon-32x32.png",
//     "D:/unite/favicon/favicons2/favicon-48x48.png"],
//                     "D:/unite/favicon/favicons2",
//                     "favicon.ico");
// await fileSystem.fileDelete("D:/unite/favicon/favicons2/", "favicon-48x48.png");

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91bml0ZWpzLWltYWdlLWNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCwyREFBd0Q7QUFLeEQsZ0RBQTZDO0FBQzdDLGdEQUE2QztBQUM3Qyx1RUFBb0U7QUFDcEUsK0VBQTRFO0FBRTVFLFNBQWlCLFNBQVEsaUJBQU87SUFJNUI7UUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVZLG1CQUFtQixDQUFDLE1BQWUsRUFBRSxPQUFpQixFQUFFLFVBQXVCLEVBQUUsaUJBQW9DOztZQUM5SCxJQUFJLEdBQUcsR0FBVyxDQUFDLENBQUMsQ0FBQztZQUVyQixNQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUUvQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNkLEtBQUsseURBQTJCLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUVwQyxNQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsaURBQXVCLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3RGLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxpREFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDbEYsTUFBTSxLQUFLLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGlEQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzRSxNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsaURBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzdFLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxpREFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDN0Us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QUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsMkhBQTJILENBQUMsQ0FBQztRQUM5SixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE9BQU8sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN4QyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0VBQXdFLENBQUMsQ0FBQztRQUV2RixNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2IsQ0FBQzs7QUExRmMsWUFBUSxHQUFXLGVBQWUsQ0FBQztBQUNuQyxlQUFXLEdBQVcsaUJBQWlCLENBQUM7QUFGM0Qsa0JBNkZDO0FBRUQscUxBQXFMO0FBQ3JMLHFMQUFxTDtBQUNyTCwrS0FBK0s7QUFFL0ssb0tBQW9LO0FBQ3BLLHFLQUFxSztBQUNySyxzS0FBc0s7QUFDdEssc0tBQXNLO0FBQ3RLLHNLQUFzSztBQUV0SyxzSkFBc0o7QUFDdEosc0pBQXNKO0FBQ3RKLHNKQUFzSjtBQUV0Siw0RkFBNEY7QUFDNUYsc0RBQXNEO0FBQ3RELHVEQUF1RDtBQUN2RCxvREFBb0Q7QUFDcEQsc0NBQXNDO0FBRXRDLG1GQUFtRiIsImZpbGUiOiJ1bml0ZWpzLWltYWdlLWNsaS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMifQ==
