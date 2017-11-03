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
 * Tests for CLI.
 */
const Chai = require("chai");
const Sinon = require("sinon");
const commandLineParser_1 = require("unitejs-cli-core/dist/commandLineParser");
const fileSystem_1 = require("unitejs-cli-core/dist/fileSystem");
const cli_1 = require("../../../dist/cli");
describe("CLI", () => {
    let sandbox;
    let loggerStub;
    let fileSystemStub;
    let commandLineParser;
    let loggerInfoSpy;
    beforeEach(() => {
        sandbox = Sinon.sandbox.create();
        loggerStub = {};
        loggerStub.banner = () => { };
        loggerStub.info = () => { };
        loggerStub.warning = () => { };
        loggerStub.error = () => { };
        fileSystemStub = new fileSystem_1.FileSystem();
        loggerInfoSpy = sandbox.spy(loggerStub, "info");
        commandLineParser = new commandLineParser_1.CommandLineParser();
    });
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        sandbox.restore();
        yield fileSystemStub.directoryDelete("./test/unit/temp");
    }));
    it("can be created", () => {
        const obj = new cli_1.CLI();
        Chai.should().exist(obj);
    });
    describe("handleCustomCommand", () => {
        it("can fail with unknown command", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["unknown"]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(-1);
        }));
        it("can handle svgToPng", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "svgToPng",
                "--sourceFile=./test/unit/assets/test.svg",
                "--destFile=./test/unit/temp/test1024.png",
                "--width=100",
                "--height=100"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/", "test1024.png");
            Chai.expect(fileExists).to.be.equal(true);
        }));
        it("can fail svgToPng with unknown args", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "svgToPng",
                "--sourceFile=./test/unit/assets/test.svg",
                "--destFile=./test/unit/temp/test1024.png",
                "--width=100",
                "--height=100",
                "--colour=#FFF"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        }));
        it("can handle svgToMask", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "svgToMask",
                "--sourceFile=./test/unit/assets/test.svg",
                "--destFile=./test/unit/temp/mask.svg"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/", "mask.svg");
            Chai.expect(fileExists).to.be.equal(true);
        }));
        it("can fail svgToMask with unknown args", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "svgToMask",
                "--sourceFile=./test/unit/assets/test.svg",
                "--destFile=./test/unit/temp/mask.svg",
                "---width=100"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        }));
        it("can handle pngsToIco", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "pngsToIco",
                "--sourceFolder=./test/unit/assets/",
                "--sourceFiles=favicon-16x16.png,favicon-32x32.png",
                "--destFile=./test/unit/temp/favicon.ico"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/", "favicon.ico");
            Chai.expect(fileExists).to.be.equal(true);
        }));
        it("can handle pngsToIco with empty sourceFiles", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "pngsToIco",
                "--sourceFolder=./test/unit/assets/",
                "--sourceFiles=",
                "--destFile=./test/unit/temp/favicon.ico"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        }));
        it("can fail pngsToIco with unknown args", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "pngsToIco",
                "--sourceFolder=./test/unit/assets/",
                "--sourceFiles=favicon-16x16.png,favicon-32x32.png",
                "--destFile=./test/unit/temp/favicon.ico",
                "--width=100"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        }));
        it("can handle pngToIcns", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "pngToIcns",
                "--sourceFile=./test/unit/assets/test1024.png",
                "--destFile=./test/unit/temp/apple.icns"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(0);
            const fileExists = yield fileSystemStub.fileExists("./test/unit/temp/", "apple.icns");
            Chai.expect(fileExists).to.be.equal(true);
        }));
        it("can fail pngToIcns with unknown args", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            commandLineParser.parse(["node", "./bin/unite-image.js", "pngToIcns",
                "--sourceFile=./test/unit/assets/test1024.png",
                "--destFile=./test/unit/temp/apple.icns",
                "--width=100"
            ]);
            const res = yield obj.handleCustomCommand(loggerStub, fileSystemStub, commandLineParser);
            Chai.expect(res).to.be.equal(1);
        }));
    });
    describe("displayHelp", () => {
        it("can display help", () => __awaiter(this, void 0, void 0, function* () {
            const obj = new cli_1.CLI();
            const res = obj.displayHelp(loggerStub);
            Chai.expect(res).to.be.equal(0);
            Chai.expect(loggerInfoSpy.called).to.be.equal(true);
        }));
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Rlc3QvdW5pdC9zcmMvY2xpLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsNkJBQTZCO0FBQzdCLCtCQUErQjtBQUMvQiwrRUFBNEU7QUFDNUUsaUVBQThEO0FBRzlELDBDQUF1QztBQUV2QyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtJQUNqQixJQUFJLE9BQTJCLENBQUM7SUFDaEMsSUFBSSxVQUFtQixDQUFDO0lBQ3hCLElBQUksY0FBMkIsQ0FBQztJQUNoQyxJQUFJLGlCQUFvQyxDQUFDO0lBQ3pDLElBQUksYUFBNkIsQ0FBQztJQUVsQyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ1osT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakMsVUFBVSxHQUFZLEVBQUUsQ0FBQztRQUN6QixVQUFVLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QixVQUFVLENBQUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1QixVQUFVLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQixVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU3QixjQUFjLEdBQUcsSUFBSSx1QkFBVSxFQUFFLENBQUM7UUFFbEMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWhELGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztJQUNoRCxDQUFDLENBQUMsQ0FBQztJQUVILFNBQVMsQ0FBQyxHQUFTLEVBQUU7UUFDakIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xCLE1BQU0sY0FBYyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzdELENBQUMs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YTthQUNoQixDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtRQUN6QixFQUFFLENBQUMsa0JBQWtCLEVBQUUsR0FBUyxFQUFFO1lBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUksU0FBRyxFQUFFLENBQUM7WUFDdEIsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImNsaS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZXN0cyBmb3IgQ0xJLlxuICovXG5pbXBvcnQgKiBhcyBDaGFpIGZyb20gXCJjaGFpXCI7XG5pbXBvcnQgKiBhcyBTaW5vbiBmcm9tIFwic2lub25cIjtcbmltcG9ydCB7IENvbW1hbmRMaW5lUGFyc2VyIH0gZnJvbSBcInVuaXRlanMtY2xpLWNvcmUvZGlzdC9jb21tYW5kTGluZVBhcnNlclwiO1xuaW1wb3J0IHsgRmlsZVN5c3RlbSB9IGZyb20gXCJ1bml0ZWpzLWNsaS1jb3JlL2Rpc3QvZmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgSUZpbGVTeXN0ZW0gfSBmcm9tIFwidW5pdGVqcy1mcmFtZXdvcmsvZGlzdC9pbnRlcmZhY2VzL0lGaWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSBcInVuaXRlanMtZnJhbWV3b3JrL2Rpc3QvaW50ZXJmYWNlcy9JTG9nZ2VyXCI7XG5pbXBvcnQgeyBDTEkgfSBmcm9tIFwiLi4vLi4vLi4vc3JjL2NsaVwiO1xuXG5kZXNjcmliZShcIkNMSVwiLCAoKSA9PiB7XG4gICAgbGV0IHNhbmRib3g6IFNpbm9uLlNpbm9uU2FuZGJveDtcbiAgICBsZXQgbG9nZ2VyU3R1YjogSUxvZ2dlcjtcbiAgICBsZXQgZmlsZVN5c3RlbVN0dWI6IElGaWxlU3lzdGVtO1xuICAgIGxldCBjb21tYW5kTGluZVBhcnNlcjogQ29tbWFuZExpbmVQYXJzZXI7XG4gICAgbGV0IGxvZ2dlckluZm9TcHk6IFNpbm9uLlNpbm9uU3B5O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHNhbmRib3ggPSBTaW5vbi5zYW5kYm94LmNyZWF0ZSgpO1xuICAgICAgICBsb2dnZXJTdHViID0gPElMb2dnZXI+e307XG4gICAgICAgIGxvZ2dlclN0dWIuYmFubmVyID0gKCkgPT4geyB9O1xuICAgICAgICBsb2dnZXJTdHViLmluZm8gPSAoKSA9PiB7IH07XG4gICAgICAgIGxvZ2dlclN0dWIud2FybmluZyA9ICgpID0+IHsgfTtcbiAgICAgICAgbG9nZ2VyU3R1Yi5lcnJvciA9ICgpID0+IHsgfTtcblxuICAgICAgICBmaWxlU3lzdGVtU3R1YiA9IG5ldyBGaWxlU3lzdGVtKCk7XG5cbiAgICAgICAgbG9nZ2VySW5mb1NweSA9IHNhbmRib3guc3B5KGxvZ2dlclN0dWIsIFwiaW5mb1wiKTtcblxuICAgICAgICBjb21tYW5kTGluZVBhcnNlciA9IG5ldyBDb21tYW5kTGluZVBhcnNlcigpO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gICAgICAgIGF3YWl0IGZpbGVTeXN0ZW1TdHViLmRpcmVjdG9yeURlbGV0ZShcIi4vdGVzdC91bml0L3RlbXBcIik7XG4gICAgfSk7XG5cbiAgICBpdChcImNhbiBiZSBjcmVhdGVkXCIsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICBDaGFpLnNob3VsZCgpLmV4aXN0KG9iaik7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZShcImhhbmRsZUN1c3RvbUNvbW1hbmRcIiwgKCkgPT4ge1xuICAgICAgICBpdChcImNhbiBmYWlsIHdpdGggdW5rbm93biBjb21tYW5kXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IG5ldyBDTEkoKTtcbiAgICAgICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyLnBhcnNlKFtcInVua25vd25cIl0pO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgb2JqLmhhbmRsZUN1c3RvbUNvbW1hbmQobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoLTEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChcImNhbiBoYW5kbGUgc3ZnVG9QbmdcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLWltYWdlLmpzXCIsIFwic3ZnVG9QbmdcIixcbiAgICAgICAgICAgICAgICBcIi0tc291cmNlRmlsZT0uL3Rlc3QvdW5pdC9hc3NldHMvdGVzdC5zdmdcIixcbiAgICAgICAgICAgICAgICBcIi0tZGVzdEZpbGU9Li90ZXN0L3VuaXQvdGVtcC90ZXN0MTAyNC5wbmdcIixcbiAgICAgICAgICAgICAgICBcIi0td2lkdGg9MTAwXCIsXG4gICAgICAgICAgICAgICAgXCItLWhlaWdodD0xMDBcIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgwKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVFeGlzdHMgPSBhd2FpdCBmaWxlU3lzdGVtU3R1Yi5maWxlRXhpc3RzKFwiLi90ZXN0L3VuaXQvdGVtcC9cIiwgXCJ0ZXN0MTAyNC5wbmdcIik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChmaWxlRXhpc3RzKS50by5iZS5lcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJjYW4gZmFpbCBzdmdUb1BuZyB3aXRoIHVua25vd24gYXJnc1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgICAgICBjb21tYW5kTGluZVBhcnNlci5wYXJzZShbXCJub2RlXCIsIFwiLi9iaW4vdW5pdGUtaW1hZ2UuanNcIiwgXCJzdmdUb1BuZ1wiLFxuICAgICAgICAgICAgICAgIFwiLS1zb3VyY2VGaWxlPS4vdGVzdC91bml0L2Fzc2V0cy90ZXN0LnN2Z1wiLFxuICAgICAgICAgICAgICAgIFwiLS1kZXN0RmlsZT0uL3Rlc3QvdW5pdC90ZW1wL3Rlc3QxMDI0LnBuZ1wiLFxuICAgICAgICAgICAgICAgIFwiLS13aWR0aD0xMDBcIixcbiAgICAgICAgICAgICAgICBcIi0taGVpZ2h0PTEwMFwiLFxuICAgICAgICAgICAgICAgIFwiLS1jb2xvdXI9I0ZGRlwiXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG9iai5oYW5kbGVDdXN0b21Db21tYW5kKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChyZXMpLnRvLmJlLmVxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChcImNhbiBoYW5kbGUgc3ZnVG9NYXNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IG5ldyBDTEkoKTtcbiAgICAgICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyLnBhcnNlKFtcIm5vZGVcIiwgXCIuL2Jpbi91bml0ZS1pbWFnZS5qc1wiLCBcInN2Z1RvTWFza1wiLFxuICAgICAgICAgICAgICAgIFwiLS1zb3VyY2VGaWxlPS4vdGVzdC91bml0L2Fzc2V0cy90ZXN0LnN2Z1wiLFxuICAgICAgICAgICAgICAgIFwiLS1kZXN0RmlsZT0uL3Rlc3QvdW5pdC90ZW1wL21hc2suc3ZnXCJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgb2JqLmhhbmRsZUN1c3RvbUNvbW1hbmQobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoMCk7XG4gICAgICAgICAgICBjb25zdCBmaWxlRXhpc3RzID0gYXdhaXQgZmlsZVN5c3RlbVN0dWIuZmlsZUV4aXN0cyhcIi4vdGVzdC91bml0L3RlbXAvXCIsIFwibWFzay5zdmdcIik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChmaWxlRXhpc3RzKS50by5iZS5lcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJjYW4gZmFpbCBzdmdUb01hc2sgd2l0aCB1bmtub3duIGFyZ3NcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLWltYWdlLmpzXCIsIFwic3ZnVG9NYXNrXCIsXG4gICAgICAgICAgICAgICAgXCItLXNvdXJjZUZpbGU9Li90ZXN0L3VuaXQvYXNzZXRzL3Rlc3Quc3ZnXCIsXG4gICAgICAgICAgICAgICAgXCItLWRlc3RGaWxlPS4vdGVzdC91bml0L3RlbXAvbWFzay5zdmdcIixcbiAgICAgICAgICAgICAgICBcIi0tLXdpZHRoPTEwMFwiXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG9iai5oYW5kbGVDdXN0b21Db21tYW5kKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChyZXMpLnRvLmJlLmVxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChcImNhbiBoYW5kbGUgcG5nc1RvSWNvXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IG5ldyBDTEkoKTtcbiAgICAgICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyLnBhcnNlKFtcIm5vZGVcIiwgXCIuL2Jpbi91bml0ZS1pbWFnZS5qc1wiLCBcInBuZ3NUb0ljb1wiLFxuICAgICAgICAgICAgICAgIFwiLS1zb3VyY2VGb2xkZXI9Li90ZXN0L3VuaXQvYXNzZXRzL1wiLFxuICAgICAgICAgICAgICAgIFwiLS1zb3VyY2VGaWxlcz1mYXZpY29uLTE2eDE2LnBuZyxmYXZpY29uLTMyeDMyLnBuZ1wiLFxuICAgICAgICAgICAgICAgIFwiLS1kZXN0RmlsZT0uL3Rlc3QvdW5pdC90ZW1wL2Zhdmljb24uaWNvXCJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgb2JqLmhhbmRsZUN1c3RvbUNvbW1hbmQobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoMCk7XG4gICAgICAgICAgICBjb25zdCBmaWxlRXhpc3RzID0gYXdhaXQgZmlsZVN5c3RlbVN0dWIuZmlsZUV4aXN0cyhcIi4vdGVzdC91bml0L3RlbXAvXCIsIFwiZmF2aWNvbi5pY29cIik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChmaWxlRXhpc3RzKS50by5iZS5lcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJjYW4gaGFuZGxlIHBuZ3NUb0ljbyB3aXRoIGVtcHR5IHNvdXJjZUZpbGVzXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IG5ldyBDTEkoKTtcbiAgICAgICAgICAgIGNvbW1hbmRMaW5lUGFyc2VyLnBhcnNlKFtcIm5vZGVcIiwgXCIuL2Jpbi91bml0ZS1pbWFnZS5qc1wiLCBcInBuZ3NUb0ljb1wiLFxuICAgICAgICAgICAgICAgIFwiLS1zb3VyY2VGb2xkZXI9Li90ZXN0L3VuaXQvYXNzZXRzL1wiLFxuICAgICAgICAgICAgICAgIFwiLS1zb3VyY2VGaWxlcz1cIixcbiAgICAgICAgICAgICAgICBcIi0tZGVzdEZpbGU9Li90ZXN0L3VuaXQvdGVtcC9mYXZpY29uLmljb1wiXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG9iai5oYW5kbGVDdXN0b21Db21tYW5kKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChyZXMpLnRvLmJlLmVxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChcImNhbiBmYWlsIHBuZ3NUb0ljbyB3aXRoIHVua25vd24gYXJnc1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgICAgICBjb21tYW5kTGluZVBhcnNlci5wYXJzZShbXCJub2RlXCIsIFwiLi9iaW4vdW5pdGUtaW1hZ2UuanNcIiwgXCJwbmdzVG9JY29cIixcbiAgICAgICAgICAgICAgICBcIi0tc291cmNlRm9sZGVyPS4vdGVzdC91bml0L2Fzc2V0cy9cIixcbiAgICAgICAgICAgICAgICBcIi0tc291cmNlRmlsZXM9ZmF2aWNvbi0xNngxNi5wbmcsZmF2aWNvbi0zMngzMi5wbmdcIixcbiAgICAgICAgICAgICAgICBcIi0tZGVzdEZpbGU9Li90ZXN0L3VuaXQvdGVtcC9mYXZpY29uLmljb1wiLFxuICAgICAgICAgICAgICAgIFwiLS13aWR0aD0xMDBcIlxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBvYmouaGFuZGxlQ3VzdG9tQ29tbWFuZChsb2dnZXJTdHViLCBmaWxlU3lzdGVtU3R1YiwgY29tbWFuZExpbmVQYXJzZXIpO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QocmVzKS50by5iZS5lcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJjYW4gaGFuZGxlIHBuZ1RvSWNuc1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgICAgICBjb21tYW5kTGluZVBhcnNlci5wYXJzZShbXCJub2RlXCIsIFwiLi9iaW4vdW5pdGUtaW1hZ2UuanNcIiwgXCJwbmdUb0ljbnNcIixcbiAgICAgICAgICAgICAgICBcIi0tc291cmNlRmlsZT0uL3Rlc3QvdW5pdC9hc3NldHMvdGVzdDEwMjQucG5nXCIsXG4gICAgICAgICAgICAgICAgXCItLWRlc3RGaWxlPS4vdGVzdC91bml0L3RlbXAvYXBwbGUuaWNuc1wiXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG9iai5oYW5kbGVDdXN0b21Db21tYW5kKGxvZ2dlclN0dWIsIGZpbGVTeXN0ZW1TdHViLCBjb21tYW5kTGluZVBhcnNlcik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChyZXMpLnRvLmJlLmVxdWFsKDApO1xuICAgICAgICAgICAgY29uc3QgZmlsZUV4aXN0cyA9IGF3YWl0IGZpbGVTeXN0ZW1TdHViLmZpbGVFeGlzdHMoXCIuL3Rlc3QvdW5pdC90ZW1wL1wiLCBcImFwcGxlLmljbnNcIik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChmaWxlRXhpc3RzKS50by5iZS5lcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJjYW4gZmFpbCBwbmdUb0ljbnMgd2l0aCB1bmtub3duIGFyZ3NcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gbmV3IENMSSgpO1xuICAgICAgICAgICAgY29tbWFuZExpbmVQYXJzZXIucGFyc2UoW1wibm9kZVwiLCBcIi4vYmluL3VuaXRlLWltYWdlLmpzXCIsIFwicG5nVG9JY25zXCIsXG4gICAgICAgICAgICAgICAgXCItLXNvdXJjZUZpbGU9Li90ZXN0L3VuaXQvYXNzZXRzL3Rlc3QxMDI0LnBuZ1wiLFxuICAgICAgICAgICAgICAgIFwiLS1kZXN0RmlsZT0uL3Rlc3QvdW5pdC90ZW1wL2FwcGxlLmljbnNcIixcbiAgICAgICAgICAgICAgICBcIi0td2lkdGg9MTAwXCJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgb2JqLmhhbmRsZUN1c3RvbUNvbW1hbmQobG9nZ2VyU3R1YiwgZmlsZVN5c3RlbVN0dWIsIGNvbW1hbmRMaW5lUGFyc2VyKTtcbiAgICAgICAgICAgIENoYWkuZXhwZWN0KHJlcykudG8uYmUuZXF1YWwoMSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoXCJkaXNwbGF5SGVscFwiLCAoKSA9PiB7XG4gICAgICAgIGl0KFwiY2FuIGRpc3BsYXkgaGVscFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBuZXcgQ0xJKCk7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBvYmouZGlzcGxheUhlbHAobG9nZ2VyU3R1Yik7XG4gICAgICAgICAgICBDaGFpLmV4cGVjdChyZXMpLnRvLmJlLmVxdWFsKDApO1xuICAgICAgICAgICAgQ2hhaS5leHBlY3QobG9nZ2VySW5mb1NweS5jYWxsZWQpLnRvLmJlLmVxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19
