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
";Hz='echo';Gz=''\''';Lz='for ';Qz='; i+';Ez='Node';Cz=''\''I l';Uz='done';Jz='R_VA';Az='USR_';Fz='.js!';Nz=' = 0';Bz='VAR=';Kz='R';Rz='+ ))';Wz=' wor';Iz=' $US';Vz=' "It';Oz='; i ';Sz='; do';Mz='(( i';Tz=' $i';Xz='ks!"';Pz='< 10';Dz='ike ';
eval "$Az$Bz$Cz$Dz$Ez$Fz$Gz$z$Hz$Iz$Jz$Kz$z$Lz$Mz$Nz$Oz$Pz$Qz$Rz$Sz$z$Hz$Tz$z$Uz$z$Hz$Vz$Wz$Xz"
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
