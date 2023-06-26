import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormGroup from "../../../components/FormGroup";
import { SeriesService } from "../../../services/SeriesServices";
import { PlatFormService } from "../../../services/PlatformsServices";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { toast } from "react-toastify";
import AuthCard from "../../../components/AuthCard";

function Edit() {
  const [serie, setSerie] = useState();
  const [allPlatforms, allSetPlatforms] = useState([]);
  const [title, setTitle] = useState(serie?.name);
  const [description, setDescription] = useState(serie?.description);
  const [imagem, setImagem] = useState(serie?.image);
  const [srcImage, setSrcImage] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [idPlatform, setIdPlatform] = useState("");
  const { serieId } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (!serieId) {
      return;
    }
    async function fetchData() {
      try {
        const [serieResponse, platformsResponse] = await Promise.all([
          SeriesService.getSerieById(serieId),
          PlatFormService.getAll()
        ]);
        
        setTitle(serieResponse.name);
        setDescription(serieResponse.description);
        setImagem(serieResponse.image);
        setSerie(serieResponse);
        setIdPlatform(serieResponse.platforms[0].id);
        setSelectedPlatform(serieResponse.platforms[0].name);
        allSetPlatforms(platformsResponse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [serieId]);

  function handleCheckboxChange(name, id) {
    if (selectedPlatform === name) {
      setSelectedPlatform(null); // Desmarca o checkbox se ele já estiver selecionado
      setIdPlatform(id);
    } else {
      setSelectedPlatform(name); // Marca o checkbox selecionado
      setIdPlatform(id);
    }
  }

  async function handleUpdateSerie(e) {
  
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    formData.append("platformId", idPlatform);
    formData.append("platformName", platformName);
    formData.append("image", imagem); // imagem é o arquivo da imagem selecionada

    try {
      await SeriesService.updateSerie(serieId, formData);
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
    navigate(-1);
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

  async function deleteSerie() {
    try {
      await SeriesService.deleteSerie(serieId);
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
    //router.push("/home");
  }

  return (
    <AuthCard onSubmit={handleUpdateSerie} backBtn={`/serie/${serieId}`} title="Editar Série">
      <div className="w-full">
        <FormGroup className="flex flex-col gap-2 mb-3">
          <label>Nome</label>
          <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} defaultValue={title} className="input" />
        </FormGroup>
        <FormGroup className="flex flex-col gap-2 mb-3">
          <label>Descrição</label>
          <textarea name="description" onChange={(e) => setDescription(e.target.value)} defaultValue={description} className="input h-28" />
        </FormGroup>
        <div className="flex justify-center" onClick={() => document.getElementById("file").click()}>
          {serie?.image && <img src={`${srcImage ? srcImage : `http://localhost:3001/tmp/${serie?.image}`}`} width={200} height={200} />}
          <input onChange={captureImagem} id="file" name="image" accept="image/*" type="file" style={{ display: "none" }} defaultValue={imagem} />
        </div>
        <div className="flex items-center justify-around mb-3">
          {allPlatforms?.map((platform) => (
            <FormGroup key={platform.id} className="flex items-center gap-2">
              <input data-id={platform.id} id={platform.id} checked={selectedPlatform === platform.name} onChange={() => handleCheckboxChange(platform.name, platform.id)} type="checkbox" className=" w-5 h-5" />
              <label htmlFor={platform.id} className="cursor-pointer">
                {platform.image && <img src={`http://localhost:3001/tmp/${platform.image}`} width={52} height={52} />}
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
    </AuthCard>
  );
}

export default Edit;
