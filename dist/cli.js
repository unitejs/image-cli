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
const icns_1 = require("unitejs-image/dist/icns");
const ico_1 = require("unitejs-image/dist/ico");
const svg_1 = require("unitejs-image/dist/svg");
const commandLineArgConstants_1 = require("./commandLineArgConstants");
const commandLineCommandConstants_1 = require("./commandLineCommandConstants");
class CLI extends cliBase_1.CLIBase {
    constructor() {
        super(CLI.APP_NAME);
    }
    handleCustomCommand(logger, fileSystem, commandLineParser) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = -1;
            const command = commandLineParser.getCommand();
            switch (command) {
                case commandLineCommandConstants_1.CommandLineCommandConstants.SVG_TO_PNG: {
                    logger.info("command", { command });
                    const sourceFile = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FILE);
                    const destFile = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.DEST_FILE);
                    const width = commandLineParser.getNumberArgument(commandLineArgConstants_1.CommandLineArgConstants.WIDTH);
                    const height = commandLineParser.getNumberArgument(commandLineArgConstants_1.CommandLineArgConstants.HEIGHT);
                    const marginX = commandLineParser.getNumberArgument(commandLineArgConstants_1.CommandLineArgConstants.MARGIN_X);
                    const marginY = commandLineParser.getNumberArgument(commandLineArgConstants_1.CommandLineArgConstants.MARGIN_Y);
                    const background = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.BACKGROUND);
                    ret = this.checkRemaining(logger, commandLineParser);
                    if (ret === 0) {
                        const svg = new svg_1.SVG();
                        ret = yield svg.toPng(logger, fileSystem, fileSystem.pathGetDirectory(sourceFile), fileSystem.pathGetFilename(sourceFile), fileSystem.pathGetDirectory(destFile), fileSystem.pathGetFilename(destFile), width, height, marginX, marginY, background);
                    }
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.SVG_TO_MASK: {
                    logger.info("command", { command });
                    const sourceFile = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FILE);
                    const destFile = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.DEST_FILE);
                    ret = this.checkRemaining(logger, commandLineParser);
                    if (ret === 0) {
                        const svg = new svg_1.SVG();
                        ret = yield svg.toMask(logger, fileSystem, fileSystem.pathGetDirectory(sourceFile), fileSystem.pathGetFilename(sourceFile), fileSystem.pathGetDirectory(destFile), fileSystem.pathGetFilename(destFile));
                    }
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.PNGS_TO_ICO: {
                    logger.info("command", { command });
                    const sourceFolder = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FOLDER);
                    const sourceFiles = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FILES);
                    const destFile = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.DEST_FILE);
                    ret = this.checkRemaining(logger, commandLineParser);
                    if (ret === 0) {
                        const ico = new ico_1.ICO();
                        ret = yield ico.fromPngs(logger, fileSystem, sourceFolder, sourceFiles ? sourceFiles.split(",") : [], fileSystem.pathGetDirectory(destFile), fileSystem.pathGetFilename(destFile));
                    }
                    break;
                }
                case commandLineCommandConstants_1.CommandLineCommandConstants.PNG_TO_ICNS: {
                    logger.info("command", { command });
                    const sourceFile = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.SOURCE_FILE);
                    const destFile = commandLineParser.getStringArgument(commandLineArgConstants_1.CommandLineArgConstants.DEST_FILE);
                    ret = this.checkRemaining(logger, commandLineParser);
                    if (ret === 0) {
                        const icns = new icns_1.ICNS();
                        ret = yield icns.fromPng(logger, fileSystem, fileSystem.pathGetDirectory(sourceFile), fileSystem.pathGetFilename(sourceFile), fileSystem.pathGetDirectory(destFile), fileSystem.pathGetFilename(destFile));
                    }
                }
            }
            return ret;
        });
    }
    displayHelp(logger) {
        logger.banner("Commands");
        logger.info("  help, version, svgToPng, svgToMask, pngsToIco");
        logger.info("");
        logger.banner("svgToPng");
        logger.info("");
        this.markdownTableToCli(logger, "| sourceFile          | 'path to svg file'                           | Source svg image to generate png                 |");
        this.markdownTableToCli(logger, "| destFile            | 'path to png file'                           | Destination image for generated png              |");
        this.markdownTableToCli(logger, "| width               | number                                       | The width in pixels to generate png              |");
        this.markdownTableToCli(logger, "| height              | number                                       | The height in pixels to generate png             |");
        this.markdownTableToCli(logger, "| marginX             | number                                       | The margin in pixels to leave at left and right  |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to 0                       |");
        this.markdownTableToCli(logger, "| marginY             | number                                       | The margin in pixels to leave at top and bottom  |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to 0                       |");
        this.markdownTableToCli(logger, "| background          | hex color                                    | The colour to fill the background                |");
        this.markdownTableToCli(logger, "|                     |                                              |   optional - defaults to transparent             |");
        logger.info("");
        logger.banner("svgToMask");
        logger.info("");
        this.markdownTableToCli(logger, "| sourceFile          | 'path to svg file'                           | Source svg image to generate svg mask            |");
        this.markdownTableToCli(logger, "| destFile            | 'path to svg mask file'                      | Destination image for generated svg mask         |");
        logger.info("");
        logger.banner("pngsToIco");
        logger.info("");
        this.markdownTableToCli(logger, "| sourceFolder        | 'folder'                                     | The folder that contains the png files           |");
        this.markdownTableToCli(logger, "| sourceFiles         | comma separated list of filenames            | The files to combine from the sourceFolder       |");
        this.markdownTableToCli(logger, "| destFile            | 'path to ico file'                           | Destination image for generated ico              |");
        logger.info("");
        logger.banner("pngToIcns");
        logger.info("");
        this.markdownTableToCli(logger, "| sourceFile          | 'path to png file'                           | Source png image to generate icns                |");
        this.markdownTableToCli(logger, "| destFile            | 'path to icns file'                          | Destination image for generated icns             |");
        logger.info("");
        logger.banner("Global Arguments");
        logger.info("");
        this.markdownTableToCli(logger, "| noColor             |                                           | If this is used no color will appear in output   |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to on                      |");
        this.markdownTableToCli(logger, "| logFile             | 'filename'                                | The log file to store the logging in             |");
        this.markdownTableToCli(logger, "|                     |                                           |   optional - defaults to no file logging         |");
        this.markdownTableToCli(logger, "");
        logger.info("");
        logger.banner("More Information");
        logger.info("");
        logger.info("  See https://github.com/unitejs/image-cli#readme for further details.");
        return 0;
    }
}
CLI.APP_NAME = "UniteJS Image";
exports.CLI = CLI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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TUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLHdFQUF3RSxDQUFDLENBQUM7UUFFdEYsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDOztBQTFKdUIsWUFBUSxHQUFXLGVBQWUsQ0FBQztBQUQvRCxrQkE0SkMiLCJmaWxlIjoiY2xpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBNYWluIGVudHJ5IHBvaW50LlxuICovXG5pbXBvcnQgeyBDTElCYXNlIH0gZnJvbSBcInVuaXRlanMtY2xpLWNvcmUvZGlzdC9jbGlCYXNlXCI7XG5pbXBvcnQgeyBDb21tYW5kTGluZVBhcnNlciB9IGZyb20gXCJ1bml0ZWpzLWNsaS1jb3JlL2Rpc3QvY29tbWFuZExpbmVQYXJzZXJcIjtcbmltcG9ydCB7IElGaWxlU3lzdGVtIH0gZnJvbSBcInVuaXRlanMtZnJhbWV3b3JrL2Rpc3QvaW50ZXJmYWNlcy9JRmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gXCJ1bml0ZWpzLWZyYW1ld29yay9kaXN0L2ludGVyZmFjZXMvSUxvZ2dlclwiO1xuaW1wb3J0IHsgSUNOUyB9IGZyb20gXCJ1bml0ZWpzLWltYWdlL2Rpc3QvaWNuc1wiO1xuaW1wb3J0IHsgSUNPIH0gZnJvbSBcInVuaXRlanMtaW1hZ2UvZGlzdC9pY29cIjtcbmltcG9ydCB7IFNWRyB9IGZyb20gXCJ1bml0ZWpzLWltYWdlL2Rpc3Qvc3ZnXCI7XG5pbXBvcnQgeyBDb21tYW5kTGluZUFyZ0NvbnN0YW50cyB9IGZyb20gXCIuL2NvbW1hbmRMaW5lQXJnQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDb21tYW5kTGluZUNvbW1hbmRDb25zdGFudHMgfSBmcm9tIFwiLi9jb21tYW5kTGluZUNvbW1hbmRDb25zdGFudHNcIjtcblxuZXhwb3J0IGNsYXNzIENMSSBleHRlbmRzIENMSUJhc2Uge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEFQUF9OQU1FOiBzdHJpbmcgPSBcIlVuaXRlSlMgSW1hZ2VcIjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihDTEkuQVBQX05BTUUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBoYW5kbGVDdXN0b21Db21tYW5kKGxvZ2dlcjogSUxvZ2dlciwgZmlsZVN5c3RlbTogSUZpbGVTeXN0ZW0sIGNvbW1hbmRMaW5lUGFyc2VyOiBDb21tYW5kTGluZVBhcnNlcik6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGxldCByZXQ6IG51bWJlciA9IC0xO1xuXG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kTGluZVBhcnNlci5nZXRDb21tYW5kKCk7XG5cbiAgICAgICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICAgICAgICBjYXNlIENvbW1hbmRMaW5lQ29tbWFuZENvbnN0YW50cy5TVkdfVE9fUE5HOiB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmluZm8oXCJjb21tYW5kXCIsIHsgY29tbWFuZCB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNvdXJjZUZpbGUgPSBjb21tYW5kTGluZVBhcnNlci5nZXRTdHJpbmdBcmd1bWVudChDb21tYW5kTGluZUFyZ0NvbnN0YW50cy5TT1VSQ0VfRklMRSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVzdEZpbGUgPSBjb21tYW5kTGluZVBhcnNlci5nZXRTdHJpbmdBcmd1bWVudChDb21tYW5kTGluZUFyZ0NvbnN0YW50cy5ERVNUX0ZJTEUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gY29tbWFuZExpbmVQYXJzZXIuZ2V0TnVtYmVyQXJndW1lbnQoQ29tbWFuZExpbmVBcmdDb25zdGFudHMuV0lEVEgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGNvbW1hbmRMaW5lUGFyc2VyLmdldE51bWJlckFyZ3VtZW50KENvbW1hbmRMaW5lQXJnQ29uc3RhbnRzLkhFSUdIVCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFyZ2luWCA9IGNvbW1hbmRMaW5lUGFyc2VyLmdldE51bWJlckFyZ3VtZW50KENvbW1hbmRMaW5lQXJnQ29uc3RhbnRzLk1BUkdJTl9YKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXJnaW5ZID0gY29tbWFuZExpbmVQYXJzZXIuZ2V0TnVtYmVyQXJndW1lbnQoQ29tbWFuZExpbmVBcmdDb25zdGFudHMuTUFSR0lOX1kpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBjb21tYW5kTGluZVBhcnNlci5nZXRTdHJpbmdBcmd1bWVudChDb21tYW5kTGluZUFyZ0NvbnN0YW50cy5CQUNLR1JPVU5EKTtcblxuICAgICAgICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tSZW1haW5pbmcobG9nZ2VyLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICAgICAgaWYgKHJldCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdmcgPSBuZXcgU1ZHKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGF3YWl0IHN2Zy50b1BuZyhsb2dnZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU3lzdGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVN5c3RlbS5wYXRoR2V0RGlyZWN0b3J5KHNvdXJjZUZpbGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVN5c3RlbS5wYXRoR2V0RmlsZW5hbWUoc291cmNlRmlsZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU3lzdGVtLnBhdGhHZXREaXJlY3RvcnkoZGVzdEZpbGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVN5c3RlbS5wYXRoR2V0RmlsZW5hbWUoZGVzdEZpbGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5YLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBDb21tYW5kTGluZUNvbW1hbmRDb25zdGFudHMuU1ZHX1RPX01BU0s6IHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuaW5mbyhcImNvbW1hbmRcIiwgeyBjb21tYW5kIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlRmlsZSA9IGNvbW1hbmRMaW5lUGFyc2VyLmdldFN0cmluZ0FyZ3VtZW50KENvbW1hbmRMaW5lQXJnQ29uc3RhbnRzLlNPVVJDRV9GSUxFKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZXN0RmlsZSA9IGNvbW1hbmRMaW5lUGFyc2VyLmdldFN0cmluZ0FyZ3VtZW50KENvbW1hbmRMaW5lQXJnQ29uc3RhbnRzLkRFU1RfRklMRSk7XG5cbiAgICAgICAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrUmVtYWluaW5nKGxvZ2dlciwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgICAgIGlmIChyZXQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ZnID0gbmV3IFNWRygpO1xuICAgICAgICAgICAgICAgICAgICByZXQgPSBhd2FpdCBzdmcudG9NYXNrKGxvZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU3lzdGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVTeXN0ZW0ucGF0aEdldERpcmVjdG9yeShzb3VyY2VGaWxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU3lzdGVtLnBhdGhHZXRGaWxlbmFtZShzb3VyY2VGaWxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU3lzdGVtLnBhdGhHZXREaXJlY3RvcnkoZGVzdEZpbGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVTeXN0ZW0ucGF0aEdldEZpbGVuYW1lKGRlc3RGaWxlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIENvbW1hbmRMaW5lQ29tbWFuZENvbnN0YW50cy5QTkdTX1RPX0lDTzoge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5pbmZvKFwiY29tbWFuZFwiLCB7IGNvbW1hbmQgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VGb2xkZXIgPSBjb21tYW5kTGluZVBhcnNlci5nZXRTdHJpbmdBcmd1bWVudChDb21tYW5kTGluZUFyZ0NvbnN0YW50cy5TT1VSQ0VfRk9MREVSKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VGaWxlcyA9IGNvbW1hbmRMaW5lUGFyc2VyLmdldFN0cmluZ0FyZ3VtZW50KENvbW1hbmRMaW5lQXJnQ29uc3RhbnRzLlNPVVJDRV9GSUxFUyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVzdEZpbGUgPSBjb21tYW5kTGluZVBhcnNlci5nZXRTdHJpbmdBcmd1bWVudChDb21tYW5kTGluZUFyZ0NvbnN0YW50cy5ERVNUX0ZJTEUpO1xuXG4gICAgICAgICAgICAgICAgcmV0ID0gdGhpcy5jaGVja1JlbWFpbmluZyhsb2dnZXIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgICAgICBpZiAocmV0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGljbyA9IG5ldyBJQ08oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gYXdhaXQgaWNvLmZyb21QbmdzKGxvZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVTeXN0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VGb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VGaWxlcyA/IHNvdXJjZUZpbGVzLnNwbGl0KFwiLFwiKSA6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVN5c3RlbS5wYXRoR2V0RGlyZWN0b3J5KGRlc3RGaWxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVTeXN0ZW0ucGF0aEdldEZpbGVuYW1lKGRlc3RGaWxlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIENvbW1hbmRMaW5lQ29tbWFuZENvbnN0YW50cy5QTkdfVE9fSUNOUzoge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5pbmZvKFwiY29tbWFuZFwiLCB7IGNvbW1hbmQgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VGaWxlID0gY29tbWFuZExpbmVQYXJzZXIuZ2V0U3RyaW5nQXJndW1lbnQoQ29tbWFuZExpbmVBcmdDb25zdGFudHMuU09VUkNFX0ZJTEUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlc3RGaWxlID0gY29tbWFuZExpbmVQYXJzZXIuZ2V0U3RyaW5nQXJndW1lbnQoQ29tbWFuZExpbmVBcmdDb25zdGFudHMuREVTVF9GSUxFKTtcblxuICAgICAgICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tSZW1haW5pbmcobG9nZ2VyLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICAgICAgaWYgKHJldCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpY25zID0gbmV3IElDTlMoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gYXdhaXQgaWNucy5mcm9tUG5nKGxvZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVTeXN0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU3lzdGVtLnBhdGhHZXREaXJlY3Rvcnkoc291cmNlRmlsZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU3lzdGVtLnBhdGhHZXRGaWxlbmFtZShzb3VyY2VGaWxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVTeXN0ZW0ucGF0aEdldERpcmVjdG9yeShkZXN0RmlsZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU3lzdGVtLnBhdGhHZXRGaWxlbmFtZShkZXN0RmlsZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3BsYXlIZWxwKGxvZ2dlcjogSUxvZ2dlcik6IG51bWJlciB7XG4gICAgICAgIGxvZ2dlci5iYW5uZXIoXCJDb21tYW5kc1wiKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oXCIgIGhlbHAsIHZlcnNpb24sIHN2Z1RvUG5nLCBzdmdUb01hc2ssIHBuZ3NUb0ljb1wiKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oXCJcIik7XG5cbiAgICAgICAgbG9nZ2VyLmJhbm5lcihcInN2Z1RvUG5nXCIpO1xuICAgICAgICBsb2dnZXIuaW5mbyhcIlwiKTtcbiAgICAgICAgdGhpcy5tYXJrZG93blRhYmxlVG9DbGkobG9nZ2VyLCBcInwgc291cmNlRmlsZSAgICAgICAgICB8ICdwYXRoIHRvIHN2ZyBmaWxlJyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU291cmNlIHN2ZyBpbWFnZSB0byBnZW5lcmF0ZSBwbmcgICAgICAgICAgICAgICAgIHxcIik7XG4gICAgICAgIHRoaXMubWFya2Rvd25UYWJsZVRvQ2xpKGxvZ2dlciwgXCJ8IGRlc3RGaWxlICAgICAgICAgICAgfCAncGF0aCB0byBwbmcgZmlsZScgICAgICAgICAgICAgICAgICAgICAgICAgICB8IERlc3RpbmF0aW9uIGltYWdlIGZvciBnZW5lcmF0ZWQgcG5nICAgICAgICAgICAgICB8XCIpO1xuICAgICAgICB0aGlzLm1hcmtkb3duVGFibGVUb0NsaShsb2dnZXIsIFwifCB3aWR0aCAgICAgICAgICAgICAgIHwgbnVtYmVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBUaGUgd2lkdGggaW4gcGl4ZWxzIHRvIGdlbmVyYXRlIHBuZyAgICAgICAgICAgICAgfFwiKTtcbiAgICAgICAgdGhpcy5tYXJrZG93blRhYmxlVG9DbGkobG9nZ2VyLCBcInwgaGVpZ2h0ICAgICAgICAgICAgICB8IG51bWJlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgVGhlIGhlaWdodCBpbiBwaXhlbHMgdG8gZ2VuZXJhdGUgcG5nICAgICAgICAgICAgIHxcIik7XG4gICAgICAgIHRoaXMubWFya2Rvd25UYWJsZVRvQ2xpKGxvZ2dlciwgXCJ8IG1hcmdpblggICAgICAgICAgICAgfCBudW1iZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFRoZSBtYXJnaW4gaW4gcGl4ZWxzIHRvIGxlYXZlIGF0IGxlZnQgYW5kIHJpZ2h0ICB8XCIpO1xuICAgICAgICB0aGlzLm1hcmtkb3duVGFibGVUb0NsaShsb2dnZXIsIFwifCAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgIG9wdGlvbmFsIC0gZGVmYXVsdHMgdG8gMCAgICAgICAgICAgICAgICAgICAgICAgfFwiKTtcbiAgICAgICAgdGhpcy5tYXJrZG93blRhYmxlVG9DbGkobG9nZ2VyLCBcInwgbWFyZ2luWSAgICAgICAgICAgICB8IG51bWJlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgVGhlIG1hcmdpbiBpbiBwaXhlbHMgdG8gbGVhdmUgYXQgdG9wIGFuZCBib3R0b20gIHxcIik7XG4gICAgICAgIHRoaXMubWFya2Rvd25UYWJsZVRvQ2xpKGxvZ2dlciwgXCJ8ICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgb3B0aW9uYWwgLSBkZWZhdWx0cyB0byAwICAgICAgICAgICAgICAgICAgICAgICB8XCIpO1xuICAgICAgICB0aGlzLm1hcmtkb3duVGFibGVUb0NsaShsb2dnZXIsIFwifCBiYWNrZ3JvdW5kICAgICAgICAgIHwgaGV4IGNvbG9yICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBUaGUgY29sb3VyIHRvIGZpbGwgdGhlIGJhY2tncm91bmQgICAgICAgICAgICAgICAgfFwiKTtcbiAgICAgICAgdGhpcy5tYXJrZG93blRhYmxlVG9DbGkobG9nZ2VyLCBcInwgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICBvcHRpb25hbCAtIGRlZmF1bHRzIHRvIHRyYW5zcGFyZW50ICAgICAgICAgICAgIHxcIik7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiXCIpO1xuXG4gICAgICAgIGxvZ2dlci5iYW5uZXIoXCJzdmdUb01hc2tcIik7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiXCIpO1xuICAgICAgICB0aGlzLm1hcmtkb3duVGFibGVUb0NsaShsb2dnZXIsIFwifCBzb3VyY2VGaWxlICAgICAgICAgIHwgJ3BhdGggdG8gc3ZnIGZpbGUnICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBTb3VyY2Ugc3ZnIGltYWdlIHRvIGdlbmVyYXRlIHN2ZyBtYXNrICAgICAgICAgICAgfFwiKTtcbiAgICAgICAgdGhpcy5tYXJrZG93blRhYmxlVG9DbGkobG9nZ2VyLCBcInwgZGVzdEZpbGUgICAgICAgICAgICB8ICdwYXRoIHRvIHN2ZyBtYXNrIGZpbGUnICAgICAgICAgICAgICAgICAgICAgIHwgRGVzdGluYXRpb24gaW1hZ2UgZm9yIGdlbmVyYXRlZCBzdmcgbWFzayAgICAgICAgIHxcIik7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiXCIpO1xuXG4gICAgICAgIGxvZ2dlci5iYW5uZXIoXCJwbmdzVG9JY29cIik7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiXCIpO1xuICAgICAgICB0aGlzLm1hcmtkb3duVGFibGVUb0NsaShsb2dnZXIsIFwifCBzb3VyY2VGb2xkZXIgICAgICAgIHwgJ2ZvbGRlcicgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBUaGUgZm9sZGVyIHRoYXQgY29udGFpbnMgdGhlIHBuZyBmaWxlcyAgICAgICAgICAgfFwiKTtcbiAgICAgICAgdGhpcy5tYXJrZG93blRhYmxlVG9DbGkobG9nZ2VyLCBcInwgc291cmNlRmlsZXMgICAgICAgICB8IGNvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIGZpbGVuYW1lcyAgICAgICAgICAgIHwgVGhlIGZpbGVzIHRvIGNvbWJpbmUgZnJvbSB0aGUgc291cmNlRm9sZGVyICAgICAgIHxcIik7XG4gICAgICAgIHRoaXMubWFya2Rvd25UYWJsZVRvQ2xpKGxvZ2dlciwgXCJ8IGRlc3RGaWxlICAgICAgICAgICAgfCAncGF0aCB0byBpY28gZmlsZScgICAgICAgICAgICAgICAgICAgICAgICAgICB8IERlc3RpbmF0aW9uIGltYWdlIGZvciBnZW5lcmF0ZWQgaWNvICAgICAgICAgICAgICB8XCIpO1xuICAgICAgICBsb2dnZXIuaW5mbyhcIlwiKTtcblxuICAgICAgICBsb2dnZXIuYmFubmVyKFwicG5nVG9JY25zXCIpO1xuICAgICAgICBsb2dnZXIuaW5mbyhcIlwiKTtcbiAgICAgICAgdGhpcy5tYXJrZG93blRhYmxlVG9DbGkobG9nZ2VyLCBcInwgc291cmNlRmlsZSAgICAgICAgICB8ICdwYXRoIHRvIHBuZyBmaWxlJyAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU291cmNlIHBuZyBpbWFnZSB0byBnZW5lcmF0ZSBpY25zICAgICAgICAgICAgICAgIHxcIik7XG4gICAgICAgIHRoaXMubWFya2Rvd25UYWJsZVRvQ2xpKGxvZ2dlciwgXCJ8IGRlc3RGaWxlICAgICAgICAgICAgfCAncGF0aCB0byBpY25zIGZpbGUnICAgICAgICAgICAgICAgICAgICAgICAgICB8IERlc3RpbmF0aW9uIGltYWdlIGZvciBnZW5lcmF0ZWQgaWNucyAgICAgICAgICAgICB8XCIpO1xuICAgICAgICBsb2dnZXIuaW5mbyhcIlwiKTtcblxuICAgICAgICBsb2dnZXIuYmFubmVyKFwiR2xvYmFsIEFyZ3VtZW50c1wiKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oXCJcIik7XG4gICAgICAgIHRoaXMubWFya2Rvd25UYWJsZVRvQ2xpKGxvZ2dlciwgXCJ8IG5vQ29sb3IgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IElmIHRoaXMgaXMgdXNlZCBubyBjb2xvciB3aWxsIGFwcGVhciBpbiBvdXRwdXQgICB8XCIpO1xuICAgICAgICB0aGlzLm1hcmtkb3duVGFibGVUb0NsaShsb2dnZXIsIFwifCAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgIG9wdGlvbmFsIC0gZGVmYXVsdHMgdG8gb24gICAgICAgICAgICAgICAgICAgICAgfFwiKTtcbiAgICAgICAgdGhpcy5tYXJrZG93blRhYmxlVG9DbGkobG9nZ2VyLCBcInwgbG9nRmlsZSAgICAgICAgICAgICB8ICdmaWxlbmFtZScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgVGhlIGxvZyBmaWxlIHRvIHN0b3JlIHRoZSBsb2dnaW5nIGluICAgICAgICAgICAgIHxcIik7XG4gICAgICAgIHRoaXMubWFya2Rvd25UYWJsZVRvQ2xpKGxvZ2dlciwgXCJ8ICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgb3B0aW9uYWwgLSBkZWZhdWx0cyB0byBubyBmaWxlIGxvZ2dpbmcgICAgICAgICB8XCIpO1xuICAgICAgICB0aGlzLm1hcmtkb3duVGFibGVUb0NsaShsb2dnZXIsIFwiXCIpO1xuICAgICAgICBsb2dnZXIuaW5mbyhcIlwiKTtcblxuICAgICAgICBsb2dnZXIuYmFubmVyKFwiTW9yZSBJbmZvcm1hdGlvblwiKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oXCJcIik7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3VuaXRlanMvaW1hZ2UtY2xpI3JlYWRtZSBmb3IgZnVydGhlciBkZXRhaWxzLlwiKTtcblxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG59XG4iXX0=
