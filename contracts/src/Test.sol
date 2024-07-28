// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.8.24;
pragma abicoder v2;
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CCMReceiver {
    receive() external payable {}

    address constant CFVAULT = 0x36eaD71325604DC15d35FAE584D7b50646D81753;

    string public name;

    event CCMReceive(
        uint32 srcChain,
        bytes srcAddress,
        bytes message,
        address token,
        uint256 amount,
        string tcMemo
    );

    event Call(address indexed sender);

    function cfReceive(
        uint32 srcChain,
        bytes calldata srcAddress,
        bytes calldata message,
        address token,
        uint256 amount
    ) external payable {
        require(msg.sender == CFVAULT, "only cfvault");
        emit Call(msg.sender);
        (string memory _name, address reciever) = abi.decode(
            message,
            (string, address)
        );
        IERC20 tokenContract = IERC20(token);
        tokenContract.transfer(reciever, amount);
        _name = _name;
        emit CCMReceive(srcChain, srcAddress, message, token, amount, _name);
    }
}
