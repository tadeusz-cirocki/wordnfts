// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract WordNFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    struct WordToken {
        uint256 id;
        string words;
    }

    uint256 public constant MAX_TOTAL_SUPPLY = 10000;
    uint256 public constant PRICE = 0.01 ether;

    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private _tokenWords;

    constructor() ERC721("Words", "WRD") {}

    function mintWordNFT(string memory words)
        public
        onlyOwner
        returns (uint256)
    {
        //owner calls, nft is minted to contract
        require(_tokenIds.current() <= MAX_TOTAL_SUPPLY, "Max supply reached");

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(address(this), newItemId);
        _tokenWords[newItemId] = words;

        return newItemId;
    }

    function buyWordNFT() external payable returns (uint256) {
        //buyer calls with ether, gets nft from contract
        require(msg.value >= PRICE, "Not enough ethers sent");
        require(balanceOf(address(this)) > 0, "All sold");

        uint256 tokenId = balanceOf(address(this));
        _transfer(address(this), msg.sender, tokenId);

        return tokenId;
    }

    function yourNftInfo(uint256 number)
        external
        view
        returns (WordToken memory)
    {
        //buyer calls, gets owned tokens info
        uint256 callerBalance = balanceOf(msg.sender);
        require(callerBalance > 0, "You own no word tokens");
        require(callerBalance >= number, "You don't own that many tokens");
        WordToken memory wordtoken;
        uint256 id = tokenOfOwnerByIndex(msg.sender, number);
        wordtoken.id = id;
        wordtoken.words = _tokenWords[id];
        return wordtoken;
    }

    function withdraw() external onlyOwner {
        //onwer calls, ethers stored on contract are send to him
        payable(msg.sender).transfer(address(this).balance);
    }
}
