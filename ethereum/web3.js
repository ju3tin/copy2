import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // We are in the browser and MetaMask is running
    web3 = new Web3(window.ethereum);
    // Request account access if needed
    window.ethereum.enable().catch(error => {
        // User denied account access...
        console.error('User denied account access');
    });
} else {
    // We are on the server or the user is not running MetaMask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/cae3e4c525ba4a75b6ae9ffe89ca6160'
    );
    web3 = new Web3(provider);
}

export default web3;
