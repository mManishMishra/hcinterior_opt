"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

/**
 * CKEditorComponent - Code-split CKEditor to reduce initial bundle size
 * CKEditor is ~500KB+, so we only load it when the component is actually rendered
 * This significantly improves initial page load performance
 */
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  {
    ssr: false,
    loading: () => (
      <div className="ckeditor-loading" style={{ 
        minHeight: '300px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}>
        <div>Loading editor...</div>
      </div>
    ),
  }
);

const ClassicEditor = dynamic(
  () => import("@ckeditor/ckeditor5-build-classic").then((mod) => mod.default),
  {
    ssr: false,
  }
);

// Dynamically import CSS
let ckeditorCSSLoaded = false;
const loadCKEditorCSS = () => {
  if (typeof window !== 'undefined' && !ckeditorCSSLoaded) {
    import('ckeditor5/ckeditor5.css');
    ckeditorCSSLoaded = true;
  }
};

const CKEditorComponent = ({ pageData, setPageData }) => {
  const [editorReady, setEditorReady] = useState(false);
  const [CustomUploadAdapterPlugin, setCustomUploadAdapterPlugin] = useState(null);

  useEffect(() => {
    // Load CSS when component mounts
    loadCKEditorCSS();

    // Dynamically import CustomUploadAdapter
    import('./CustomUploadAdapter').then((mod) => {
      setCustomUploadAdapterPlugin(mod.default);
      setEditorReady(true);
    });
  }, []);

  if (!editorReady || !CustomUploadAdapterPlugin) {
    return (
      <div className="ckeditor-loading" style={{ 
        minHeight: '300px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}>
        <div>Loading editor...</div>
      </div>
    );
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      data={pageData}
      onChange={(event, editor) => {
        const data = editor.getData();
        setPageData(data);
      }}
      config={{
        licenseKey: 'GPL',
        extraPlugins: [CustomUploadAdapterPlugin],
        toolbar: [
          'undo', 'redo', '|',
          'heading', '|', 'bold', 'italic', '|',
          'link', 'imageUpload', 'insertTable', 'mediaEmbed', '|',
          'bulletedList', 'numberedList', 'indent', 'outdent', '|',
          'imageResize', 'imageStyle:full', 'imageStyle:side', '|',
          'imageTextAlternative'
        ],
        image: {
          resizeUnit: 'px',
          resizeOptions: [
            {
              name: 'resizeImage:original',
              value: null,
              label: 'Original'
            },
            {
              name: 'resizeImage:50',
              value: '50',
              label: '50%'
            },
            {
              name: 'resizeImage:75',
              value: '75',
              label: '75%'
            }
          ],
          toolbar: [
            'imageResize',
            'imageStyle:full', 'imageStyle:side', '|',
            'imageTextAlternative'
          ]
        }
      }}
    />
  );
}

export default CKEditorComponent;
