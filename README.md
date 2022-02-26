# Coffee Supply Chain Project

Coffee Supply Chain Project complete with UML graphs and tests.


## Setup Information

Dependencies:

node v12.22.9

npm v6.14.15

Truffle v5.4.32

web3 v1.7.0

truffle-hdwallet-provider v^1.0.17


## Extra Notes

I added a 'checkValueDist' modifier to SupplyChain.sol to act as a payment amount check for the buyItem() function. the 'checkValue' modifier is applied to the purchaseItem() function. Therefore, I also made the purchaseItem() function payable and now submit a value with it as well (Basically it works the same way as the buyItem() function now).


## Rinkeby Transaction Information

### Supply Chain Contract Info:

transaction hash: 0x1b25452f69b32497970b197171d6cc26d64ae9387fd80b134737d78a01414f31

contract address: 0xF9808995Be00f32bcFd5743e312b8827C01e3B79


### Migrations Contract info:

transaction hash: 0x78fb50776e885f4c52e188cae3ba9f347b9660503c550888b8f3816eb8a04fb3

contract address: 0x8157116Aab9a05dF8370671A43293E4195A5aD70
