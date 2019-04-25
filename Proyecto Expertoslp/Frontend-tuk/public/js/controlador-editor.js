// function setEditor(){
// window.ed=ace.edit('html');
// ed.setTheme('ace/theme/monokai');
// ed.setMode('ace/mode/html');

// }

// setEditor();


var editorhtml= CodeMirror.fromTextArea (
    document.getElementById('html'),{
        mode:"xml",
        theme: "blackboard",
        lineNumbers:true,
        autoCloseTags:true
        
        
    
    });

    console.log(editorhtml);

// var editorcss= CodeMirror.fromTextArea (
//         document.getElementById('css'),{
//             mode:"css",
//             theme: "blackboard",
//             lineNumbers:true,
//             autoCloseTags:true,      
//         }).getValue;

// var editorjs= CodeMirror.fromTextArea (
//         document.getElementById('js'),{
//             mode:"javascript",
//             theme: "base16-dark",
//             lineNumbers:true,
//             autoCloseTags:true
//         });
 


// var code = document.getElementById('resultado').contentWindow.document;

// // console.log(editorhtml2);


//     document.body.onkeyup = function() {
// // editorhtml.getDoc().setValue(document.body.onkeyup);

//         code.open();
//         // console.log(editorhtml2.onkeyup);
//         code.writeln(
            
//             editorhtml.value +
//             "<style>" +
//             editorcss.getvalue+
//             "</style>" +
//             "<script>" +
//             editorjs.value +
//             "</script>"
//         );
//         code.close();
//     }
 
    
  
