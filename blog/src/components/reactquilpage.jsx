import React, { useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { useDropzone } from 'react-dropzone';
import 'react-quill/dist/quill.snow.css';

// Custom Toolbar
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
      <option value="1"></option>
      <option value="2"></option>
      <option value=""></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
  </div>
);

// Rich Text Editor Component
const RichTextEditor = () => {
  const [value, setValue] = useState('');
  const quillRef = useRef(null);

  const handleImage = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'image', reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => handleImage(acceptedFiles),
  });

  return (
    <div className='rich-text-editor'>
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={setValue}
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        placeholder="Compose something amazing..."
      />
      
    </div>
  );
};

// Quill Modules
RichTextEditor.modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      image: function () {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = () => {
          const file = input.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            const quill = this.quill;
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', e.target.result);
          };
          reader.readAsDataURL(file);
        };
      },
    },
  },
};

// Quill Formats
RichTextEditor.formats = [
  'header', 'bold', 'italic', 'underline', 'link', 'image',
];

export default RichTextEditor;
