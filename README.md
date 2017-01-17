# node-bash-obfuscate
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
  -o, --out         Output file
  -c, --chunk-size  Chunk size (for variables in obfuscated code)   [default: 4]
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
";Az='USR_';Bz='VAR=';Cz=''\''I l';Dz='ike ';Ez='Node';Fz='.js!';Gz=''\''';Hz='echo';Iz=' $US';Jz='R_VA';Kz='R';Lz='for ';Mz='(( i';Nz=' = 0';Oz='; i ';Pz='< 10';Qz='; i+';Rz='+ ))';Sz='; do';Tz=' $i';Uz='done';Vz=' "It';Wz=' wor';Xz='ks!"';
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
