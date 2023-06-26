import { useState, useEffect } from "react";
import FormGroup from "../components/FormGroup";
import { SeriesService } from "../services/SeriesServices";
import { PlatFormService } from "../services/PlatformsServices";
import { toast } from "react-toastify";
import AuthCard from "../components/AuthCard";
import { useAuth } from "../context/manageAuthContext"

function New() {
  const [allPlatforms, allSetPlatforms] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imagem, setImagem] = useState("");
  const [srcImage, setSrcImage] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [idPlatform, setIdPlatform] = useState("");
  const {member } = useAuth();

  useEffect(() => {

    async function fetchData() {
      try {
        const response = await PlatFormService.getAll();
        allSetPlatforms(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, []);
  function handleCheckboxChange(platformName, id) {
    if (selectedPlatform === platformName) {
      setSelectedPlatform(null); // Desmarca o checkbox se ele já estiver selecionado
      setIdPlatform(id);
    } else {
      setSelectedPlatform(platformName); // Marca o checkbox selecionado
      setIdPlatform(id);
    }
  }

  async function handleUpdateSerie(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("platform", idPlatform);
    formData.append("image", imagem);
    formData.append("userId", member.id);

    try {
      await SeriesService.create(formData);
    } catch (err) {
      console.log(err);
    }
    toast("Série Cadastrada com Sucesso", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    //router.push("/home");
  }

  function captureImagem(e) {

    // Verifica se usuaário selecionou alguma imagem
    if (e.target.files && e.target.files?.length > 0) {
      setImagem(e.target?.files[0]);

      // Permite ler o conteúdo do arquivo do computador do usuário
      const readFile = new FileReader();

      // Função executada se a leitura do arquivo for sucesso
      readFile.onload = function (arquivocCarregado) {
        // Converter imagem para base64
        const baseImagem64 = arquivocCarregado.target.result;
        setSrcImage(baseImagem64);
      };

      // Método responsável por ler o conteúdo
      readFile.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <AuthCard onSubmit={handleUpdateSerie} backBtn={true} title="Adicionar Série">
      <div className="w-full">
        <FormGroup className="flex flex-col gap-2 mb-3">
          <label>Nome</label>
          <input type="text" placeholder="Nome da série" onChange={(e) => setName(e.target.value)} defaultValue={name} className="input" />
        </FormGroup>
        <FormGroup className="flex flex-col gap-2 mb-3">
          <label>Descrição</label>
          <textarea placeholder="Descrição da série" onChange={(e) => setDescription(e.target.value)} defaultValue={description} className="input h-28 placeholder:text-gray-500" />
        </FormGroup>
        <div className="flex justify-center" onClick={() => document.getElementById("file").click()}>
          {srcImage && <img src={srcImage} width={200} height={200} />}
          {!srcImage && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-20 h-20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          }
          <input onChange={captureImagem} id="file" name="file" accept="image/*" type="file" style={{ display: "none" }} />
        </div>
        <div className="flex items-center justify-around mb-3">
          {allPlatforms?.map((platform) => (
            <FormGroup key={platform.id} className="flex items-center">
              <input data-id={platform.id} id={platform.id} checked={selectedPlatform === platform.name} onChange={() => handleCheckboxChange(platform.name, platform.id)} type="checkbox" className=" w-5 h-5" />
              <label htmlFor={platform.name} className="cursor-pointer">
                <img src={`http://localhost:3001/tmp/${platform.image}`} width={52} height={52} />
              </label>
            </FormGroup>
          ))}
        </div>
        <div className="flex gap-3">
          <button type="submit" className="bg-[#CC3434] px-1 py-2
  rounded-md text-white w-full text-center cursor-pointer font-medium text-xl hover:bg-[#c22525] transition active:bg-[#c22525]">Salvar</button>
        </div>
      </div>
    </AuthCard>
  );
}

export default New;
