# node-bash-obfuscate
[![npm](https://img.shields.io/npm/l/bash-obfuscate.svg)](https://github.com/willshiao/node-bash-obfuscate/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/bash-obfuscate.svg)](https://www.npmjs.com/package/bash-obfuscate)

A Node.js CLI tool and library to heavily obfuscate bash scripts.


## Installation

```
$ npm install -g bash-obfuscate
$ bash-obfuscate script.sh -o output.sh
```


## Usage

```
Usage: bash-obfuscate <inputFilename> [options]

Options:
  -o, --out                       Output file
  -c, --chunk-size, --chunk-size  Chunk size (for variables in obfuscated code)
                                                                    [default: 4]
  -r, --randomize                 Randomize variable order
                                                       [boolean] [default: true]
```


## Example

### Input
```bash
#!/usr/bin/env bash

USR_VAR='I like Node.js!'

echo $USR_VAR
for (( i = 0; i < 10; i++ )); do
    echo $i
done
echo "It works!"
```

### Output
```bash
z="
";TP=' $i';G=''\''';H2QjY='echo';V=' "It';S6iH='; do';C5fo=''\''I l';A9Iq='USR_';E='Node';WtLbp=' wor';K='R';NOW=' = 0';Pyc='< 10';MuZQ='(( i';X='ks!"';U='done';Dj='ike ';F='.js!';I=' $US';JkC='R_VA';B='VAR=';R9bd='+ ))';LN='for ';O0x87='; i ';QUcxk='; i+';
eval "$A9Iq$B$C5fo$Dj$E$F$G$z$H2QjY$I$JkC$K$z$LN$MuZQ$NOW$O0x87$Pyc$QUcxk$R9bd$S6iH$z$H2QjY$TP$z$U$z$H2QjY$V$WtLbp$X"
```


## FAQ

### How does it work?
This tool divides the bash script into chunks (size specified by the `-c` flag). It then assigns a variable name to each chunk (with the same variable name for identical chunks) and replaces the original script with variable references, essentially scrambling the original script.

### How do I deobfuscate a script?
Although this does not provide a method of automatically deobfuscating a script, it can be fairly easily done manually. To deobfuscate a bash script, you just have to have the script print out the contents of the deobfuscated script instead of having the script execute it.

No detailed instructions will be provided because the exact details will vary as new obfuscation stages are added to the script.

### What's the point? I can deobfuscate it so easily...
The idea is not to provide absolute or even robust protection for your code against someone with a good understanding of bash. Its main purpose is to discourage tampering from someone with little/no understanding of bash.

The main problem with bash obfuscation is that the code can always be printed out when it is about to be executed, which is also when the code is deobfuscated.
