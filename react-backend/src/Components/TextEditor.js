import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";


export const TextEditor = () => {
	const [editorText, setEditorText] = useState('')

	const modules = {
		toolbar: [
			['bold', 'italic', 'underline'],
			[{ "indent": "+1" }, { "indent": "-1" }],
			[{ "list": "ordered" }, { "list": "bullet" }]
		]
	};

	const placeholder = 'Enter your answer...';

	const { quill, quillRef } = useQuill({ modules, placeholder });

	useEffect(() => {
		if (quill) {
			quill.on('text-change', (delta, oldContent, source) => {
				setEditorText(quill.root.innerHTML)
			})
		}
	}, [quill]);

	const element = (<div className="p-1 h-150-px" ><div ref={quillRef} /></div>)

	return { quill, quillRef, element, editorText, setEditorText }
}
