import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';
import { useToast } from '../../hooks/toast';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();
  const { addToast } = useToast();

  async function handleUpload(): Promise<void> {
    uploadedFiles.map(async file => {
      const data = new FormData();
      data.append('upload', file.file);

      try {
        await api.patch('/delivery/upload', data);

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Importação realizada com sucesso',
        });

        history.push('/Dashboard');
      } catch (err) {
        console.log(err.response.data.message);

        if (err.response.data.status) {
          addToast({
            type: 'error',
            title: 'Erro na importação',
            description: err.response.data.message,
          });
        } else {
          addToast({
            type: 'error',
            title: 'Erro na importação',
            description: 'Ocorreu um erro ao tentar importar o arquivo.',
          });
        }
      }
    });
  }

  function submitFile(files: File[]): void {
    const arrFiles: FileProps[] = [];
    files.map(file => {
      arrFiles.push({
        file,
        name: file.name,
        readableSize: filesize(file.size),
      });
    });

    setUploadedFiles(arrFiles);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar dados</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
