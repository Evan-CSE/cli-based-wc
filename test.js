const {exec} = require('child_process');
const fetchResult   = require('./index');

async function runExec(command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
        if (err) {
            reject(err);
        } else {
            resolve(stdout);
        }
        });
    });
}

describe("Test with wc", () => {

    it("count number of words", async () => {
        const chai = await import('chai');

        let expectedOutput = await runExec('wc in.txt -w');
        let actualOutput   = fetchResult('in.txt', {w: true});
        
        chai.expect(expectedOutput).to.equal(actualOutput);
    });

    it("count maximum size of line", async () => {
        const chai = await import('chai');

        let expectedOutput = await runExec('wc in.txt -L');
        let actualOutput   = fetchResult('in.txt', {L: true});
        
        chai.expect(expectedOutput).to.equal(actualOutput);
    });

    it("count number of characters", async () => {
        const chai = await import('chai');

        let expectedOutput = await runExec('wc in.txt -m');
        let actualOutput   = fetchResult('in.txt', {c: true});
        
        chai.expect(expectedOutput).to.equal(actualOutput);
    });

    it("count number of lines", async () => {
        const chai = await import('chai');

        let expectedOutput = await runExec('wc in.txt -l');
        let actualOutput   = fetchResult('in.txt', {l: true});
        
        chai.expect(expectedOutput).to.equal(actualOutput);
    });
    
    it("measure file size in byte", async () => {
        const chai = await import('chai');

        let expectedOutput = await runExec('wc in.txt -c');
        let actualOutput   = fetchResult('in.txt', {s: true});
        
        chai.expect(expectedOutput).to.equal(actualOutput);
    });
})