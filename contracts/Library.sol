// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
contract Library{

    event AddBook(address recipient, uint bookId);
    event SetFinished(uint bookId, bool finished);
    struct Book{
        uint id;
        string name;
        uint year;
        string author;
        bool finished;
    }

    Book[] public bookList;

    // Mapping of book id to the wallet address of the owner
    mapping(uint256 => address) public bookToOwner;
      
    function addBook(string memory name, uint year, string memory author, bool finished) external{
        uint bookId = bookList.length;
       bookList.push(Book(bookId, name, year, author, finished));
    //    console.log("the first name of the book is ", bookList[0]);
       bookToOwner[bookId] = msg.sender;
        emit AddBook(msg.sender, bookId);
    }

    function _getBookList(bool finished) private view returns(Book[] memory){
        Book[] memory temporary = new Book[](bookList.length);
        uint counter =0;
        for(uint i=0; i<bookList.length; i++){
            if(bookToOwner[i] == msg.sender && bookList[i].finished == finished){
                temporary[counter] = bookList[i];
                counter++;
            }
        }

        Book[] memory result = new Book[](counter);
        for(uint i =0; i<counter; i++){
            result[i] = temporary[i];
        }
        return result;
    }   
    function getfinishedBook() external view returns(Book[] memory){
        return _getBookList(true);
    }
    function getFinishedBook() external view returns(Book[] memory){
        return _getBookList(false);
    }

    function setFinished(uint bookId, bool finished) external{
        if(bookToOwner[bookId] == msg.sender){
            bookList[bookId].finished = finished;
            emit SetFinished(bookId, finished);
        }
    }
}