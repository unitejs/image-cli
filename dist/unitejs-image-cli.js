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
                    const marginX = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.MARGIN_X);
                    const marginY = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.MARGIN_Y);
                    const background = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.BACKGROUND);
                    const svg = new svg_1.SVG();
                    ret = yield svg.toPng(display, fileSystem, fileSystem.pathGetDirectory(sourceFile), fileSystem.pathGetFilename(sourceFile), fileSystem.pathGetDirectory(destFile), fileSystem.pathGetFilename(destFile), width, height, marginX, marginY, background);
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.SVG_TO_MASK: {
                    display.info(`command: ${command}`);
                    const sourceFile = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FILE);
                    const destFile = commandLineParser.getArgument(commandLineArgConstants_1.CommandLineArgConstants.DEST_FILE);
                    const svg = new svg_1.SVG();
                    ret = yield svg.toMask(display, fileSystem, fileSystem.pathGetDirectory(sourceFile), fileSystem.pathGetFilename(sourceFile), fileSystem.pathGetDirectory(destFile), fileSystem.pathGetFilename(destFile));
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
        display.info("  help, version, svgToPng, svgToMask, pngsToIco");
        display.info("");
        display.diagnostics("svgToPng");
        display.info("");
        this.markdownTableToCli(display, "| sourceFile          | 'path to svg file'                           | Source svg image to generate png                 |");
        this.markdownTableToCli(display, "| destFile            | 'path to png file'                           | Destination image for generated png              |");
        this.markdownTableToCli(display, "| width               | number                                       | The width in pixels to generate png              |");
        this.markdownTableToCli(display, "| height              | number                                       | The height in pixels to generate png             |");
        this.markdownTableToCli(display, "| marginX             | number                                       | The margin in pixels to leave at left and right  |");
        this.markdownTableToCli(display, "|                     |                                              |   optional - defaults to 0                       |");
        this.markdownTableToCli(display, "| marginY             | number                                       | The margin in pixels to leave at top and bottom  |");
        this.markdownTableToCli(display, "|                     |                                              |   optional - defaults to 0                       |");
        this.markdownTableToCli(display, "| background          | hex color                                    | The colour to fill the background                |");
        this.markdownTableToCli(display, "|                     |                                              |   optional - defaults to transparent             |");
        display.info("");
        display.diagnostics("svgToMask");
        display.info("");
        this.markdownTableToCli(display, "| sourceFile          | 'path to svg file'                           | Source svg image to generate svg mask            |");
        this.markdownTableToCli(display, "| destFile            | 'path to svg mask file'                      | Destination image for generated svg mask         |");
        display.info("");
        display.diagnostics("pngsToIco");
        display.info("");
        this.markdownTableToCli(display, "| sourceFolder        | 'folder'                                     | The folder that contains the png files           |");
        this.markdownTableToCli(display, "| sourceFiles         | comma separated list of filenames            | The files to combine from the sourceFolder       |");
        this.markdownTableToCli(display, "| destFile            | 'path to ico file'                           | Destination image for generated ico              |");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91bml0ZWpzLWltYWdlLWNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCwyREFBd0Q7QUFLeEQsZ0RBQTZDO0FBQzdDLGdEQUE2QztBQUM3Qyx1RUFBb0U7QUFDcEUsK0VBQTRFO0FBRTVFLFNBQWlCLFNBQVEsaUJBQU87SUFJNUI7UUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVZLG1CQUFtQixDQUFDLE1BQWUsRUFBRSxPQUFpQixFQUFFLFVBQXVCLEVBQUUsaUJBQW9DOztZQUM5SCxJQUFJLEdBQUcsR0FBVyxDQUFDLENBQUMsQ0FBQztZQUVyQixNQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUUvQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNkLEtBQUsseURBQTJCLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUVwQyxNQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsaURBQXVCLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3RGLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxpREFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDbEYsTUFBTSxLQUFLLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGlEQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzRSxNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsaURBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzdFLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxpREFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEYs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QU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSwySEFBMkgsQ0FBQyxDQUFDO1FBQzlKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsMkhBQTJILENBQUMsQ0FBQztRQUM5SixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLDJIQUEySCxDQUFDLENBQUM7UUFDOUosT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVqQixPQUFPLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLHdFQUF3RSxDQUFDLENBQUM7UUFFdkYsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUM7O0FBaEhjLFlBQVEsR0FBVyxlQUFlLENBQUM7QUFDbkMsZUFBVyxHQUFXLGlCQUFpQixDQUFDO0FBRjNELGtCQW1IQyIsImZpbGUiOiJ1bml0ZWpzLWltYWdlLWNsaS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMifQ==
