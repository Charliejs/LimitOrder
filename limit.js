"use strict";
      var exports = {};
      Object.defineProperty(exports, "__esModule", { value: true });
      //const web3_1 = require("web3");
      const {LimitOrderBuilder} = require("@1inch/limit-order-protocol/limit-order.builder.js");
      const {LimitOrderProtocolFacade}= require("@1inch/limit-order-protocol/limit-order-protocol.facade.js");
      const {Web3ProviderConnector} = require("@1inch/limit-order-protocol/connector/web3-provider.connector.js");
        require("./main");
      
      const contractAddress = '0x5fa31604fc5dcebfcac2481f9fa59d174126e5e6';
      const walletAddress = Moralis.User.current().get("ethAddress");
      const chainId = 1;

      const web3 =  Moralis.enable();
      // You can create and use a custom provider connector (for example: ethers)
      const connector = new Web3ProviderConnector(web3);

      const limitOrderBuilder = new LimitOrderBuilder(
          contractAddress,
          chainId,
          connector
      );

      const limitOrderProtocolFacade = new LimitOrderProtocolFacade(
          contractAddress,
          connector
      );
      let amount = Number(
      document.getElementById("from_amount").value * 10**currentTrade.from.decimals)
      let to_limitAmount = Number(document.getElementById("to_amount").value);
      let gas = Number(document.getElementById("price").value);  
      // Create a limit order and it's signature
      const RFQorder = limitOrderBuilder.buildRFQOrder({
        id: 1,
        expiresInTimestamp: 1623166102,
        makerAssetAddress: currentTrade.from.address,
        takerAssetAddress: currentTrade.to.address,
        makerAddress: walletAddress,
        makerAmount: amount,
        takerAmount: to_limitAmount,
      });
      const limitOrderTypedData = limitOrderBuilder.buildRFQOrderTypedData(RFQorder);
      const signature = limitOrderBuilder.buildOrderSignature(
        walletAddress,
        limitOrderTypedData);

      // Create a call data for fill the limit order
      const callData = limitOrderProtocolFacade.fillRFQOrder(
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
      document.getElementById("limit_order").onclick = limitSwap;