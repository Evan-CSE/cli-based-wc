#! /usr/bin/env node

const { program } = require('commander');
const fs          = require('fs');
const { exec }    = require('child_process');

program
    .argument(`<file_name>`)
    .description("See file statistics")
    .option(`-c` ,"Count number of characters")
    .option(`-s`, "File size in bytes")
    .option(`-l`, "Number of lines")
    .option(`-w`, "Number of words")
    .option(`-L`, "Maximum width of a line")
    .action(main);

program.parseAsync(process.argv);

function countNumberOfLinesInString(data) {
    return data.split('\n').length - 1;
}

function getNumberOfCharacters(data) {
    return data.length;
}

function getMaxLineWidthFromString(data) {
    return (
        data.split('\n')
            .reduce((maxLineLength, line) => {
                return Math.max(maxLineLength, line.length);
            }, 0)
    );
}

function getNumberOfWordsFromString(data) {
    return data.trim().split(/\s+/).length;
}

function main (fileName, options) {
    const result = fetchResult(fileName, options);
    console.log(result);
}

function fetchResult(fileName, options) {

    try {
        const fileStat           = fs.statSync(fileName);
        const fileData           = fs.readFileSync(fileName, 'utf-8');
        const fileSizeInBytes    = fileStat.size;
        const numberOfLines      = countNumberOfLinesInString(fileData);
        const maxLineLength      = getMaxLineWidthFromString(fileData);
        const wordCount          = getNumberOfWordsFromString(fileData);
        const numberOfCharacters = getNumberOfCharacters(fileData);

        const result = [];
        for (option in options) {
            switch (option) {
                case 'c' :
                    result.push(numberOfCharacters);
                    break;
                case 's':
                    result.push(fileSizeInBytes);
                    break;
                case 'l':
                    result.push(numberOfLines);
                    break;
                case 'w':
                    result.push(wordCount);
                    break;
                case 'L':
                    result.push(maxLineLength);

            }
        }

        if (result.length == 0) {
            result.push(numberOfCharacters);
            result.push(fileSizeInBytes);
            result.push(numberOfLines);
            result.push(wordCount);
            result.push(maxLineLength);
        }

        result.push(fileName);

        const wholeResult = (result.toString(' ').replaceAll(',' , ' '));
        return wholeResult + "\n";
        
    } catch (err) {
        console.log(err);
    }
}

module.exports = fetchResult;