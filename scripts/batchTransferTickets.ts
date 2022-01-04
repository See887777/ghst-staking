import { Signer } from "@ethersproject/abstract-signer";

import { ethers, network } from "hardhat";
import { IERC1155 } from "../typechain";
import { gasPrice, maticStakingAddress } from "./helperFunctions";

async function batchTicketTransfer() {
  const accounts = await ethers.getSigners();

  const itemManager = "0x8D46fd7160940d89dA026D59B2e819208E714E82";

  let testing = ["hardhat"].includes(network.name);
  let signer: Signer;

  if (testing) {
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [itemManager],
    });
    signer = await ethers.provider.getSigner(itemManager);
  } else if (network.name === "matic") {
    signer = accounts[0];
  } else {
    throw Error("Incorrect network selected");
  }

  //an array of the addresses to receive the tickets
  const addresses: string[] = [
    "0xE5561F7eADD55bEbdba7e06888804f6AD37DBcf9",
    "0x511e675011856fa5C751de284F7A8046c5e7c78d",
    "0x3837E3E1901CC309aaBAc1F610D440323DC840d2",
    "0x9E78fb8009251aa4c16f7D4C518Baac58d893865",
    "0xCcC8076Af1FE7fde7c638567081B82596e27cB02",
    "0x1A42216475319C6Ed13992a30D2C4E763acF7d85",
    "0x7d9489BBcC62e6b98d2A4374169952152EAf7DaE",
    "0x8a724CB32348b7a7fe6C7aB7eD722ff9869C7743",
    "0x9bfA3531738D37f2160850E14f1C4663dae03d37",
    "0x8b2b6937213a40518C105829c5865A37e2e6c592",
    "0x0c535F59104A9d296fe6bb24274ab5567AbAeFD4",
    "0xf937a09d904D2bE9636AaA72980ef77BCF9233e1",
    "0xf7b3E12Dd62F13eca44D2863f391a7f0263c07b3",
    "0x90abde24d5de0f94f416c322f694602a644600e2",
    "0x3AF09684f77Fa6Fb566dc9f8656b25493068bE29",
    "0xa915023B3eD1e00E078789e63de079b4D6dCc348",
    "0x92E216ac6Dcd7D67F138443f95fDc83bD7dd398f",
    "0x59B5Be6db0753942ECcBA68A4c44576C02e8fC03",
    "0x08cb3bDFe552FC12A1B682893A0d9FF6dbD3a52B",
    "0x92E216ac6Dcd7D67F138443f95fDc83bD7dd398f",
    "0x92E216ac6Dcd7D67F138443f95fDc83bD7dd398f",
    "0x4D72fC4a30C7F50964BbbdC7463C9aD074B3719d",
    "0xb436141073EFE6C21aC6BE9A5Bb0D1D74F0ce87C",
    "0x0B7deA71cd3bb23d35dF0374c81467176A081693",
    "0x24361DF8A930D0781C550ed6C18dA49eF8948988",
    "0x99655CA16C742b46A4a05AFAf0f7798C336Fd279",
    "0x1A4394ad3d5B6A40D0528d586f2eDb282a847399",
    "0x6687fABfA33E2b342877E33bEc742C703968036f",
    "0xB5a6D0F698E58C6E5bc1B9A7Ff402419F585F0E2",
    "0x2879fd9866607223BF11545F4F252Db94c36c5e7",
    "0x2879fd9866607223BF11545F4F252Db94c36c5e7",
    "0x6653025323a6f7c97db8CaC9E6643F45e24EF318",
    "0x24361DF8A930D0781C550ed6C18dA49eF8948988",
    "0x697203445B51cc43664EeB8D87dB3117425b3F52",
    "0xb55988515fa7e7699da8770a714722816e254966",
    "0x1F67848e80FB9854cc0D16A184562467b0738BE5",
    "0xa080C96dbaa0C49a19aDEB5AB0149638F3c493Af",
    "0x3837E3E1901CC309aaBAc1F610D440323DC840d2",
    "0x2CD41AA2CB6E901c2973d61952C1747b1e269a52",
    "0xa257263e2f79b4c5F9641257387193e5E43ebca9",
    "0xA6c37993267085450aDE3b63636A25b61Ec3925c",
    "0xa915023b3ed1e00e078789e63de079b4d6dcc348",
    "0xedb75bfcd48d2e55b96cc08baa6b930747506db8",
    "0x815446DBC3f21D4710Cc504864C444837986a86C",
    "0x00a3D4e0134Ff2046e9C9B83D3321625bA3DA1Bd",
    "0xb7203c834b373a3c779db2c302C6b386D522E6e3",
    "0x90c375B8acdf8ab6a8978E39ea8Cc280a6b8797e",
    "0x8EA8721F27eFcAaBB3901Ed6756505Ab873F15a7",
    "0xD400cB2c06bd59b1Cf15CB7794182AF4843C8341",
    "0x88d985Df3e4a636f0B6663742fe7200Bb4956642",
    "0xaB88533C1D07c777057ea130c9A167d674Db92FC",
    "0x084d54bc4Ed9D856b9D8Fa79AcCC79A81eC9Ec94",
    "0x80fb192D3f73c8AF8051ee4F59B9Eccf30A4DCf3",
    "0xedb75bfcd48d2e55b96cc08baa6b930747506db8",
    "0x35F87CF2c34137314D133E6B95A8CbD31DE82301",
    "0xE21236307F8A1c4C97e05e62373791F6d2911fe7",
    "0xffe7bcEaC39f5AbCBe2588CBF0407d2213f11105",
    "0xedb75bfcd48d2e55b96cc08baa6b930747506db8",
    "0xEdB75bfCD48d2E55B96CC08bAA6b930747506DB8",
    "0x5A42c9Dde8b182ff69209B43C0Aed1750782A579",
    "0x079e2fca2a993D64029c67DD6e05F07ffEc0B427",
    "0xCfd5297778D979c2e24b35A3C96Fb77cFDF811e7",
    "0xCfd5297778D979c2e24b35A3C96Fb77cFDF811e7",
    "0x4bC9f77B776533FD8e1c977Ff5cF28b2B5955539",
    "0xe2F8ffA704474259522Df3B49F4F053d2e47Bf98",
    "0xAA3fCD37B7F61f97F18184dFCAa62106Da622eAF",
    "0xCfd5297778D979c2e24b35A3C96Fb77cFDF811e7",
    "0x2170199E6ef61E8e4f9CBD899a2428127dEBdEc8",
    "0x35F87CF2c34137314D133E6B95A8CbD31DE82301",
    "0x4cCFe436F73668084746750267D4BF06dB02A037",
    "0x6365dB1621410Bf4BFAFB18fcdA74c172D7BDDC7",
    "0x9c7ca7CEd42e10baCA84F17D7153b2f27Ce61DB7",
    "0xf7b3E12Dd62F13eca44D2863f391a7f0263c07b3",
    "0x8156f6097EF7df6dD34ef2b351B327F48093060B",
    "0xe2F8ffA704474259522Df3B49F4F053d2e47Bf98",
    "0x06743B3Df2b5bb0c8288aaCa4BaCd3301Ef8d170",
    "0x80fb192D3f73c8AF8051ee4F59B9Eccf30A4DCf3",
    "0x3f571BdEEfde53185f5AC1A7E63BdB31F97d0F0D",
    "0xE29054172DfCBAdcBFA9FBB98edc84dBD4531FaF",
    "0x477c8E224258affFa3Ca285EE53f424026b3Bc38",
    "0xb7203c834b373a3c779db2c302C6b386D522E6e3",
    "0x7209A9C945EAcFF92e758df0B9E194e692B5Ebea",
    "0xe817a3df429c30D8418Efc23CCfcfE2c79962fDe",
    "0x6687fABfA33E2b342877E33bEc742C703968036f",
    "0x42cAe2ed6f5cC6EB4e92AE78A865bAa7EE2010fe",
    "0x8EA8721F27eFcAaBB3901Ed6756505Ab873F15a7",
    "0xBB363D5b6e091B16A93060EBb1DFC14c63a11DD9",
    "0x3293dE4513A9b8f6683f46672c991E87dE6C5839",
    "0xb436141073EFE6C21aC6BE9A5Bb0D1D74F0ce87C",
    "0x2879fd9866607223BF11545F4F252Db94c36c5e7",
    "0x1EF376Eb7D4e5BEb4119CE5BB1fF4B6E03E436B9",
    "0xDda192059EC84e2Bb056Ada945297d768BB3276A",
    "0x24361DF8A930D0781C550ed6C18dA49eF8948988",
    "0xCFf501d840CFC644AE2B5071195005581E5A83f8",
    "0x9FAa1ae9C60A800852498a6BE1C046F413292112",
    "0x54D35105Dcb34Df8ae1648b3710380600E7558Ba",
    "0xa499Df2Bdae854093e5576c26C9e53E1b30d25E5",
    "0x37DE670aE6F6D247033fa84Cff1Cd4c81c8f1a5A",
    "0xa3e0c05cdf9bbd82bf3b8413d7a2fa2d78a3b5ed",
    "0x697203445B51cc43664EeB8D87dB3117425b3F52",
    "0xF738db2E863D5a5be1DD25c63A995184e74FFbDA",
    "0x35EDaC24f1656265B9E30e546617564b7a9D97fd",
    "0x91e545f09a8519cc555672964b8fc38107409e65",
    "0x04556062C1815f5707096112BDDd4A474bF434e4",
    "0xA9BE254316BC272E90892Ca422280d487FFf74b3",
    "0x65a43DD2a44356748e12c32F1Bb503DC2634Af40",
    "0x2571e1b1C0Afbb4F3927615C38879de43B866081",
    "0xedb75bfcd48d2e55b96cc08baa6b930747506db8",
    "0xa257263e2f79b4c5f9641257387193e5e43ebca9",
    "0x5A42c9Dde8b182ff69209B43C0Aed1750782A579",
    "0x00a3D4e0134Ff2046e9C9B83D3321625bA3DA1Bd",
    "0xa257263e2f79b4c5f9641257387193e5e43ebca9",
  ];

  const ticketId = 6; //dropTicketId
  const value = 1; //1 ticket per address

  const ticketsI = (await ethers.getContractAt(
    "TicketsFacet",
    maticStakingAddress,
    signer
  )) as IERC1155;

  for (let index = 0; index < addresses.length; index++) {
    const address = addresses[index];
    console.log(
      `Transferring ticket to ${address}, index ${index + 1} of ${
        addresses.length
      }`
    );

    const tx = await ticketsI.safeTransferFrom(
      itemManager,
      address,
      ticketId,
      value,
      [],
      {
        gasPrice: gasPrice,
      }
    );
    console.log("hash:", tx.hash);

    await tx.wait();
  }
}

batchTicketTransfer()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });