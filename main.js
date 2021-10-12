Moralis.initialize("YlBISwTb8QNY3VseZkmeZc0Cz3dXElpaZQ2rUNpB"); // Application id from moralis.io
Moralis.serverURL = "https://hveotz2vahry.moralishost.com:2053/server"; //Server url from moralis.io
var exports = {};
Object.defineProperty(exports, "__esModule", { value: true });
/*"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//var web3_1 = require("web3");
const {LimitOrderBuilder,
    LimitOrderProtocolFacade,
    Web3ProviderConnector} = require("@1inch/limit-order-protocol");
import Web3 from "web3";
import {
    LimitOrderBuilder,
    LimitOrderProtocolFacade,
    Web3ProviderConnector,
} from "@1inch/limit-order-protocol";*/
let currentTrade = {};
let currentSelectSide;
let tokens;
async function login() {
    try {
        currentUser = Moralis.User.current();
        if(!currentUser){
            currentUser = await Moralis.Web3.authenticate();
        }
        document.getElementById("limit_order").disabled=false;
        } catch (error) {
        console.log(error);
    }
}
async function init(){
    await Moralis.initPlugins();
    await Moralis.enable();
    await listAvailableTokens();
    currentUser = Moralis.User.current();
        if(currentUser){
            document.getElementById("limit_order").disabled=false;
        }
}
async function listAvailableTokens() {
    const result = await Moralis.Plugins.oneInch.getSupportedTokens({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
    });
    let parent = document.getElementById("token_list");
    tokens = result.tokens;
    for(const address in tokens){
        let token=tokens[address];
        let div = document.createElement("div");
        div.setAttribute("data-address", address)
        div.className="token_row";
        let html = `
        <img class="token_list_img" src="${token.logoURI}">
        <span class="token_list_text">${token.symbol}</span>
        `
        div.innerHTML=html;
        div.onclick= (()=>{selectToken(address)});
        parent.appendChild(div);
    }
}
function selectToken(address) {
    closeModel();
    //let address = event.target.getAttribute("data-address");
    currentTrade[currentSelectSide]= tokens[address];
    console.log(currentTrade);
    renderInterface();
    getQuote();
}
function renderInterface() {
    if(currentTrade.from){
        document.getElementById("from_token_img").src=currentTrade.from.logoURI;
        document.getElementById("from_token_text").innerHTML=currentTrade.from.symbol;
    }
    if(currentTrade.to){
        document.getElementById("to_token_img").src=currentTrade.to.logoURI;
        document.getElementById("to_token_text").innerHTML=currentTrade.to.symbol;
    }
}
function openModal(side) {
    currentSelectSide=side;
    document.getElementById("token_model").style.display="block";
    
}
function closeModel() {
    document.getElementById("token_model").style.display="none";
    
}
async function getQuote() {
    if(!currentTrade.from && !currentTrade.to && !document.getElementById("from_amount").Value)return;
    let amount =Number(
        document.getElementById("from_amount").value * 10**currentTrade.from.decimals
    );   
    const quote = await Moralis.Plugins.oneInch.quote({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: currentTrade.from.address, // The token you want to swap
        toTokenAddress: currentTrade.to.address, // The token you want to receive
        amount: amount,
      });
      console.log(quote);
      document.getElementById("gas_estimate").innerHTML = quote.estimatedGas;
      document.getElementById("to_amount").value = quote.toTokenAmount/ (10**currentTrade.from.decimals);
      document.getElementById("price").value = quote.toTokenAmount/ (10**currentTrade.from.decimals);
}
/*function limitSwap(){
    "use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//var web3_1 = require("web3");

var contractAddress = '0x5fa31604fc5dcebfcac2481f9fa59d174126e5e6';
var walletAddress = Moralis.User.current().get("ethAddress");
var chainId = 1;
var web3 = new Moralis.enable();
// You can create and use a custom provider connector (for example: ethers)
var connector = new Web3ProviderConnector(web3);
var limitOrderBuilder = new LimitOrderBuilder(contractAddress, chainId, connector);
var limitOrderProtocolFacade = new LimitOrderProtocolFacade(contractAddress, connector);

let amount = Number(
    document.getElementById("from_amount").value * 10**currentTrade.from.decimals)
let to_limitAmount = Number(document.getElementById("to_amount").value);
let gas = Number(document.getElementById("price").value);

// Create a limit order and it's signature
var RFQorder = limitOrderBuilder.buildRFQOrder({
    id: 1,
    expiresInTimestamp: 1623166102,
    makerAssetAddress: currentTrade.from.address,
    takerAssetAddress: currentTrade.to.address,
    makerAddress: walletAddress,
    makerAmount: amount,
    takerAmount: to_limitAmount,
});
var  typedData = limitOrderBuilder.buildRFQOrderTypedData(RFQorder);
var signature = limitOrderBuilder.buildOrderSignature(
    walletAddress,
    limitOrderTypedData);
// Create a call data for fill the limit order
var callData = limitOrderProtocolFacade.fillRFQOrder(
    RFQorder,
    signature,
    amount,
    to_limitAmount);
// Send transaction for the order filling
// Must be implemented
sendTransaction({
    from: walletAddress,
    gas: 210000,
    gasPrice: gas,
    to: contractAddress,
    data: callData,
});
}*/

init();
document.getElementById("login_button").onclick = login;
document.getElementById("from_token_select").onclick = (()=> {openModal("from")});
document.getElementById("to_token_select").onclick = (()=> {openModal("to")});
document.getElementById("model_close").onclick = closeModel;
document.getElementById("from_amount").onblur = getQuote;
//document.getElementById("swap_button").onclick = trySwap;
//document.getElementById("limit_order").onclick = limitSwap;
document.getElementById("limit_home").onclick = limit_home;
document.getElementById("swap_home").onclick = swap_home;











