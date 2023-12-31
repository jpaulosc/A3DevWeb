
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import FormGroup from "../../../components/formGroup/FormGroup";
import { SeriesService } from "../../../services/SeriesServices";
import { PlatFormService } from "../../../services/PlatformsServices";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const EditSerie = () => {
  const [serie, setSerie] = useState();
  const [allPlatforms, allSetPlatforms] = useState([]);
  const [name, setName] = useState(serie?.name);
  const [description, setDescription] = useState(serie?.description);
  const [imagem, setImagem] = useState(serie?.image);
  const [srcImage, setSrcImage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [idPlatform, setIdPlatform] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchData() {
      try {
        const [serieResponse, platformsResponse] = await Promise.all([
          SeriesService.getSerieById(id),
          PlatFormService.getAll()
        ]);

        setSerie(serieResponse);
        allSetPlatforms(platformsResponse);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  },[id]);

  function handleCheckboxChange (platformName, id) {
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
    formData.append("name", name || serie?.name);
    formData.append("description", description || serie?.description);
    formData.append("platformId", idPlatform || serie?.platforms[0].id);
    formData.append("image", imagem || serie?.image ); // imagem é o arquivo da imagem selecionada

    try {
      await SeriesService.updateSerie(id, formData);
    } catch (error) {
      console.error(error);
    }
    toast("Série atualizada com sucesso", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/home");
  }

  function captureImagem(e) {

    // Verifica se usuaário selecionou alguma imagem
    if ( e.target.files && e.target.files?.length > 0) {
      setImagem(e.target?.files[0]);

      // Permite ler o conteúdo do arquivo do computador do usuário
      const readFile = new FileReader();

      // Função executada se a leitura do arquivo for sucesso
      readFile.onload = function(arquivocCarregado) {
        // Converter imagem para base64
        const baseImagem64 = arquivocCarregado.target.result;
        setSrcImage(baseImagem64);
      };

      // Método responsável por ler o conteúdo
      readFile.readAsDataURL(e.target.files[0]);
    }
  }

  async function deleteSerie() {
    try {
      await SeriesService.deleteSerie(id);
    } catch (err) {
      console.log(err.message);
    }

    toast("Série excluída com Sucesso", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/home");
  }

  return (
    <form onSubmit={handleUpdateSerie} className=" bg-[#cc3434] w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="bg-[#FDECEC] rounded-lg flex items-center flex-col w-[300px] md:w-[400px] p-4 gap-2">
        <div className="w-full">
          <Link className="mb-7" to="/home">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_28_1420)">
                <path d="M40 22H15.66L26.84 10.82L24 8L8 24L24 40L26.82 37.18L15.66 26H40V22Z" fill="black"/>
              </g>
              <defs>
                <clipPath id="clip0_28_1420">
                  <rect width="48" height="48" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </Link>
          <h1 className="font-medium text-2xl text-center">Editar Série</h1>
        </div>
        <div className="w-full">
          <FormGroup className="flex flex-col gap-2 mb-3">
            <label>Nome</label>
            <input type="text" onChange={(e) => setName(e.target.value)} defaultValue={name || serie?.name} className="input" />
          </FormGroup>
          <FormGroup className="flex flex-col gap-2 mb-3">
            <label>Descrição</label>
            <textarea onChange={(e) => setDescription(e.target.value)} defaultValue={description || serie?.description} className="input h-28" />
          </FormGroup>
          <div className="flex justify-center" onClick={() => document.getElementById("file").click()}>
            <img src={`${srcImage ? srcImage : `http://localhost:3001/tmp/${serie?.image}`}`} width={200} height={200} alt="preview" />
            <input onChange={captureImagem} id="file" name="file" accept="image/*" type="file"style={{display: "none"}} />
          </div>
          <div className="flex items-center justify-around mb-3">
            {allPlatforms?.map((platform) => (
              <FormGroup key={platform.id} className="flex items-center">
                <input data-id={platform.id} id={platform.id} checked={selectedPlatform === platform.name} onChange={() => handleCheckboxChange(platform.name, platform.id)} type="checkbox" className=" w-5 h-5" />
                <label htmlFor={platform.name} className="cursor-pointer">
                  <img src={`http://localhost:3001/tmp/${platform.image}`} width={52} height={52} alt="preview" />
                </label>
              </FormGroup>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-[#CC3434] px-1 py-2
    rounded-md text-white cursor-pointer text-center w-full font-medium text-xl hover:bg-[#c22525] transition active:bg-[#c22525]">Salvar</button>
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <button className=" bg-red-400 px-1 py-2
    rounded-md text-white cursor-pointer text-center w-full font-medium text-xl hover:bg-[#c22525] transition active:bg-[#c22525]">Deletar Série</button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="AlertDialogOverlay" />
                <AlertDialog.Content className="AlertDialogContent">
                  <AlertDialog.Title className=" font-semibold rounded-sm bg-red-300 px-2 text-center mb-3 text-xl text-red-800">Tem certeza que deseja deletar ?</AlertDialog.Title>
                  <AlertDialog.Description className=" text-gray-900 mb-7">
                    Esta ação é permanente e não poderá ser desfeita.
                  </AlertDialog.Description>
                  <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
                    <AlertDialog.Cancel asChild>
                      <button className="Button mauve">Cancelar</button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button className="Button red" onClick={deleteSerie}>Sim, deletar série</button>
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditSerie;
