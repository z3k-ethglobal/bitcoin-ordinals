import {  ECPairFactory } from 'ecpair';
import * as bitcoin from 'bitcoinjs-lib';
import * as tinysecp from 'tiny-secp256k1';

const ECPair = ECPairFactory(tinysecp);
const testNet = bitcoin.networks.testnet;

const keyPair = ECPair.makeRandom({networks: testNet});
const pubKey = keyPair.publicKey;
const publicAddress = bitcoin.payments.p2pkh({pubkey:pubKey}).address;
const privKey = keyPair.toWIF();

console.log("Here's a random Bitcoin Testnet Key-Pair : ");
console.log(`Public Bitcoin Address : `, publicAddress);
console.log(`Private Key Bruhhhhhh : `, privKey);











