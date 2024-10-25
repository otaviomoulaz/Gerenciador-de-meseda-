document.addEventListener('DOMContentLoaded', function () {
    const walletForm = document.getElementById('wallet-form');
    const allowanceForm = document.getElementById('allowance-form');
    const productForm = document.getElementById('product-form');
    const estimateForm = document.getElementById('estimate-form');
    const productList = document.getElementById('product-list');
    const allowanceInput = document.getElementById('allowance');
    const walletInput = document.getElementById('wallet');
    const currentWalletValue = document.getElementById('current-wallet-value');
    const estimatedWalletValue = document.getElementById('estimated-wallet-value')
    function loadAllowance() {
        const allowance = localStorage.getItem('allowance');
        if (allowance) {
            allowanceInput.value = allowance;
        }
    }
    function loadWallet() {
        const wallet = localStorage.getItem('wallet')
        if (wallet) {
            walletInput.value = wallet
            currentWalletValue.textContent = parseFloat(wallet).toFixed(2)
        }
    }
    function loadProdcts() {
        const allowance = localStorage.getItem("allowance")
        if (allowance) {
            const products = JSON.parse(localStorage.getItem("products")) || []
            products.forEach(product => addProductToList(product));
        }
    }
    function addProductToList(product) {
        const li = document.createElement('li')
        const allowance = parseFloat(localStorage.getItem('allowance')) || 0;
        const currentWallet = parseFloat(localStorage.getItem('wallet')) || 0;
        let months = 'N/A';
        if (allowance > 0) {
            const totalMonths = (product.price - currentWallet) / allowance;
            months = totalMonths > 0 ? Math.ceil(totalMonths) : 0;
        }
        li.textContent = `${product.name} | R$ ${product.price} | ${months}mês(es) para comprar`
        const removeButton = documentcreateElement('button');
        removeButton.addEventListener('click',()=>removeproduct(product,li));
        li.appendChild(removeButton);
        productList.appendChild(li);
    }
    function removeProduct(product,li){
    let products=JSON.parse(localStorage.getItem('products'))||[];
    products=products.filter(p=>p.name!==product.name||p.price!==product.price)
    localStorage.setItem('products',JSON.stringify(products))
    productList.removeChild(li);
    }
    estimateForm.addEventListener('submit',function(e){
     e.preventDefault();
    });
    
    });