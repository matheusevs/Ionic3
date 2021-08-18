"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var typescript_1 = require("typescript");
var typescript_utils_1 = require("../util/typescript-utils");
var logger_1 = require("../logger/logger");
var FileSystemCompilerHost = (function () {
    function FileSystemCompilerHost(options, fileSystem, setParentNodes) {
        if (setParentNodes === void 0) { setParentNodes = true; }
        this.options = options;
        this.fileSystem = fileSystem;
        this.setParentNodes = setParentNodes;
        this.diskCompilerHost = typescript_1.createCompilerHost(this.options, this.setParentNodes);
    }
    FileSystemCompilerHost.prototype.fileExists = function (filePath) {
        filePath = path_1.normalize(filePath);
        var fileContent = this.fileSystem.getFileContent(filePath);
        if (fileContent) {
            return true;
        }
        return this.diskCompilerHost.fileExists(filePath);
    };
    FileSystemCompilerHost.prototype.readFile = function (filePath) {
        filePath = path_1.normalize(filePath);
        var fileContent = this.fileSystem.getFileContent(filePath);
        if (fileContent) {
            return fileContent;
        }
        return this.diskCompilerHost.readFile(filePath);
    };
    FileSystemCompilerHost.prototype.directoryExists = function (directoryPath) {
        directoryPath = path_1.normalize(directoryPath);
        var stats = this.fileSystem.getDirectoryStats(directoryPath);
        if (stats) {
            return true;
        }
        return this.diskCompilerHost.directoryExists(directoryPath);
    };
    FileSystemCompilerHost.prototype.getFiles = function (directoryPath) {
        directoryPath = path_1.normalize(directoryPath);
        return this.fileSystem.getFileNamesInDirectory(directoryPath);
    };
    FileSystemCompilerHost.prototype.getDirectories = function (directoryPath) {
        directoryPath = path_1.normalize(directoryPath);
        var subdirs = this.fileSystem.getSubDirs(directoryPath);
        var delegated;
        try {
            delegated = this.diskCompilerHost.getDirectories(directoryPath);
        }
        catch (e) {
            delegated = [];
        }
        return delegated.concat(subdirs);
    };
    FileSystemCompilerHost.prototype.getSourceFile = function (filePath, languageVersion, onError) {
        filePath = path_1.normalize(filePath);
        // we haven't created a source file for this yet, so try to use what's in memory
        var fileContentFromMemory = this.fileSystem.getFileContent(filePath);
        if (fileContentFromMemory) {
            var typescriptSourceFile = typescript_utils_1.getTypescriptSourceFile(filePath, fileContentFromMemory, languageVersion, this.setParentNodes);
            return typescriptSourceFile;
        }
        var diskSourceFile = this.diskCompilerHost.getSourceFile(filePath, languageVersion, onError);
        return diskSourceFile;
    };
    FileSystemCompilerHost.prototype.getCancellationToken = function () {
        return this.diskCompilerHost.getCancellationToken();
    };
    FileSystemCompilerHost.prototype.getDefaultLibFileName = function (options) {
        return this.diskCompilerHost.getDefaultLibFileName(options);
    };
    FileSystemCompilerHost.prototype.writeFile = function (fileName, data, writeByteOrderMark, onError) {
        fileName = path_1.normalize(fileName);
        logger_1.Logger.debug("[NgcCompilerHost] writeFile: adding " + fileName + " to virtual file system");
        this.fileSystem.addVirtualFile(fileName, data);
    };
    FileSystemCompilerHost.prototype.getCurrentDirectory = function () {
        return this.diskCompilerHost.getCurrentDirectory();
    };
    FileSystemCompilerHost.prototype.getCanonicalFileName = function (fileName) {
        return this.diskCompilerHost.getCanonicalFileName(fileName);
    };
    FileSystemCompilerHost.prototype.useCaseSensitiveFileNames = function () {
        return this.diskCompilerHost.useCaseSensitiveFileNames();
    };
    FileSystemCompilerHost.prototype.getNewLine = function () {
        return this.diskCompilerHost.getNewLine();
    };
    return FileSystemCompilerHost;
}());
exports.FileSystemCompilerHost = FileSystemCompilerHost;
