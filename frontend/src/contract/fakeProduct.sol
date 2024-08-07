// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract fakeProduct{
    struct product{
        uint sno;
        string pname;
        string psource;
        string pdestination;
        uint ptimestamp;
    }
    // struct productsSeller{
    //     uint    sno;
    //     string pname;
    //     string psource;
    //     string pdestination;

    // }
    event oldData(uint _sno,string  _pname,string  _psource,string  _pdestination);
    uint public a;
    address owner;
    mapping(uint=>product) public mapManufactureProduct;
    mapping(uint=>product[]) public mapSellerProduct;
    mapping(uint=>product[]) public mapAllProduct;
    mapping (address=>address)  manufactureMap;
    mapping (address=>address)  sellerMap;
    constructor(){
        owner=msg.sender;
    }
    modifier onlyOwner(){
        require(msg.sender==owner,"only manufacturer add product");
        _;
    }
    modifier checkManufacture(){
        require(msg.sender==manufactureMap[msg.sender],"only manufacturer add product");
        _;
    }
    modifier checkSeller(){
        require(msg.sender==sellerMap[msg.sender],"only seller can update the product");
        _;
    }

    // add manufacturer;
    function addManufacture(address  manufactureAddress)external onlyOwner{
        manufactureMap[manufactureAddress]=manufactureAddress;
    }
    function addSeller(address  sellerAddress)external onlyOwner{
        sellerMap[sellerAddress]=sellerAddress;
    }


    function addProduct(uint _sno,string memory _pname,string memory _psource,string memory _pdestination) external checkManufacture{
        require(mapManufactureProduct[_sno].sno==0,"Product with this serial number already exists");
        if(_sno!=0){
            
        product memory newProduct=product({
            sno:_sno,
            pname:_pname,
            psource:_psource,
            pdestination:_pdestination,
            ptimestamp:block.timestamp
        });
        emit oldData(_sno,_pname,_psource,_pdestination);
        a=a+1;
        mapManufactureProduct[_sno]=newProduct;
        mapAllProduct[_sno].push(newProduct);
            
        }
        else 
        revert("Serial number can not be zero");
    }
    function getProduct(uint __sno)external view returns(bool found,uint _sno,string memory _pname,string memory _psource,string memory _pdestination)
    {
        product memory retriveProduct=mapManufactureProduct[__sno];
        _sno=retriveProduct.sno;
        _pname=retriveProduct.pname;
        _psource=retriveProduct.psource;
        _pdestination=retriveProduct.pdestination;
        return (true,_sno,_pname,_psource,_pdestination);
        
    }

    // functon for seller

    function productSeller(uint _sno,string memory _pname,string memory _psource,string memory _pdestination) external checkSeller
    {   
        require(mapManufactureProduct[_sno].sno!=0,"Product does not exist ");
        
        product memory newProduct = product({
            sno:_sno,
            pname:_pname,
            psource:_psource,
            pdestination:_pdestination,
            ptimestamp:block.timestamp
        });
        mapAllProduct[_sno].push(newProduct);
        mapSellerProduct[_sno].push(newProduct); 
        
    
  
    }

    // viewing product added by seller which are mapped to manufacture product
    function viewSellerProduct(uint _sno,uint _index)external view returns(product memory pd){
        product storage retriveProduct = mapSellerProduct[_sno][_index];
        return(retriveProduct);  
    }
    function viewAllProduct(uint _sno)external view returns(product[] memory pd){
        // product storage retriveProduct = mapAllProduct[_sno][_index];
        return(mapAllProduct[_sno]);  
    }
    
}