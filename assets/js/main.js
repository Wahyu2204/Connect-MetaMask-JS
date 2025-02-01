let provider;
let signer;
let userAddress;

// Fungsi untuk menghubungkan ke MetaMask
const connectWallet = async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    console.log("Wallet Connected:", userAddress);  // Cek wallet address

    // Mengubah tombol dan menampilkan form pemesanan
    document.getElementById('connectWallet').style.display = "none"; // Sembunyikan tombol connect
    document.getElementById('disconnectWallet').style.display = "inline-block"; // Tampilkan tombol disconnect
    document.getElementById('orderButton').style.display = "block"; // Tampilkan tombol pesan
  } else {
    alert("MetaMask tidak terpasang di browser Anda.");
  }
}

// Fungsi untuk melakukan transaksi pembayaran
const payWithEthereum = async () => {
  const amountInEther = document.getElementById("amount").value;
  try {
    const tx = await signer.sendTransaction({
      to: "0xYourEthereumAddress",  // Ganti dengan alamat Ethereum tujuan (misal alamat bisnis)
      value: ethers.utils.parseEther(amountInEther) // Mengkonversi ETH ke Wei
    });
    console.log("Transaksi berhasil:", tx);
    alert('Pembayaran Berhasil, Terima Kasih!');
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan transaksi:", error);
    alert('Pembayaran Gagal!');
  }
}

// Fungsi untuk memutuskan koneksi MetaMask
function disconnectWallet() {
  // MetaMask tidak memiliki metode langsung untuk memutuskan koneksi
  // Jadi kita hanya akan menyembunyikan tombol pesan dan mengubah tampilan tombol connect
  document.getElementById('connectWallet').style.display = "block"; // Tampilkan tombol connect
  document.getElementById('disconnectWallet').style.display = "none"; // Sembunyikan tombol disconnect
  document.getElementById('orderButton').style.display = "none"; // Sembunyikan tombol pesan

  alert("MetaMask Disconnected");
}