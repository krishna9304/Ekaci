import { React } from "react";

import PDFViewer from "pdf-viewer-reactjs";

function Click({ pdfFile }) {
  return (
    <div>
      <div className="bg-[#F0F3FC]">
        <div className="">
          {pdfFile && (
            <>
              <PDFViewer
                document={{
                  url: pdfFile,
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Click;
