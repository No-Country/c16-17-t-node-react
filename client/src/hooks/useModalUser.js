import { useState } from 'react';
import { useUser } from './';
import { saveOnCloundinary } from './../services';

export function useModalUser({ toggleModalUser }) {
  const [userBlob, setUserBlob] = useState('');
  const [userCloudData, setUserCloudData] = useState({
    url:'',
    public_id:'',
    img_tag:''
  });
  const [invalid, setInvalid] = useState({
    name: null,
    lastName: null,
  });
  const { editUserData } = useUser();

  const handleUploadUserFile = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setUserBlob(reader.result);
      saveOnCloundinary(reader.result)
        .then(data => setUserCloudData({
          url: data.url,
          public_id: data.public_id,
          img_tag: data.tags[0],
        }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const lastName = formData.get('lastName');
    const telephone = formData.get('telephone');

    if (name === '' || lastName === '') {
      setInvalid({
        name: name === '' ? 'Por favor ingresa tu nombre' : null,
        lastName: lastName === '' ? 'Por favor ingresa tu apellido' : null,
      });
      return;
    }

    const data = {
      name,
      lastName,
      telephone,
    };

    if (userBlob !== '') {
      data.image = {
        id: userCloudData.public_id,
        url: userCloudData.url,
      }
    }

    editUserData(data);
    toggleModalUser();
  };

  return {
    userBlob,
    invalid,
    handleUploadUserFile,
    handleSubmit,
  };
}
