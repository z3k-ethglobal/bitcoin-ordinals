import {  ECPairFactory } from 'ecpair';
import * as bitcoin from 'bitcoinjs-lib';
import * as tinysecp from 'tiny-secp256k1';

const ECPair = ECPairFactory(tinysecp);
const testNet = bitcoin.networks.testnet;

// several types of fucking addresses on bitcoin testnet/mainnet
// to be indentified by the fucking prefixes
// we need ones with "tb1" to work with
// This is P2WPKH/P2WSH addresses (Pay-to-Witness-Public-Key-Hash/Script Hash) 

const keyPair = ECPair.makeRandom({network: testNet});
const wtf = bitcoin.payments.p2wpkh({pubkey: keyPair.publicKey, network: testNet});
const privKey = keyPair.toWIF();


console.log(wtf);

console.log("Here's a random Bitcoin Testnet Key-Pair : ");
console.log(`Public Bitcoin Address : `, wtf.address);
console.log(`Private Key Bruhhhhhh : `, privKey);

// If I have bitcoin holdings, that means I have several "unspent notes"
// these unspent notes, I get from the {OUTPUT} field of my previous transaction
// So we need previous transaction info while sending a new txs

// We'll fund our bitcoin public address from faucet and get transaction ID from that website
// And use this txsID in building my new transaction

// Storing keys here 
// Here's a random Bitcoin Testnet Key-Pair : 
// Public Bitcoin Address :  tb1q0vqlvfw5uccygpqy6kcq00yjqp37un7056xzsq
// Private Key Bruhhhhhh :  cTqgZWes2CLXyt2kevQjSpJcgpEweBbe8MntZAwVaVzctyamnLoQ
// TX Hash of faucet funding :  4c9cde6dd2041df750b54129bf4b5be7982932de47058fbbf8d03fb3ddd7a55c


const zetaAddress = 'tb1qy9pqmk2pd9sv63g27jt8r657wy0d9ueeh0nqur';
const txBuilder = new bitcoin.Psbt({network:testNet});
txBuilder.setVersion(2); 
txBuilder.setLocktime(0); 
const txId = '4c9cde6dd2041df750b54129bf4b5be7982932de47058fbbf8d03fb3ddd7a55c';

// Create data to send to zeta using .embed
// don't worry about OP_RETURN, .embed takes care of it all
const data = Buffer.from('Knee Grow','utf-8');
const bigData = bitcoin.payments.embed({data: [data]});

// Add input to builder
txBuilder.addInput({hash: txId, index: 0});

// zetachain needs 2 outputs
// 1st output should be address to TSS Bitcoin Address
// 2nd output should contain our data output
txBuilder.addOutput({address: zetaAddress, value: 1});
txBuilder.addOutput({script: bigData.output, value:0});

// sign the tx
txBuilder.signInput(0, keyPair);
// console.log(keyPair);

















