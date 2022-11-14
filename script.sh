# installing dependencies
echo "installing dependencies.."
yarn

# compiling contract
echo "compiling contract.."
yarn solcjs --abi --bin --base-path . --include-path node_modules -o . *.sol

# executing js script
echo "execuing js script.."
node ethersTest.js