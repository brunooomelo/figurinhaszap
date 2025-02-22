// <Dialog.Root
//   open={dialogSubmit && !!previewImagem}
//   onOpenChange={handleDialogSubmit}
// >
//   <Dialog.Trigger asChild>
//     <button
//       type="button"
//       aria-label="Gerar figurinha para receber pelo Whatsapp"
//       className="rounded bg-indigo-600 px-2.5 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
//       onClick={() => {
//         event({
//           action: "upload_image",
//           label: "envio de imagem",
//           category: "upload",
//           value: 1,
//         });
//       }}
//       disabled={!sticker || isSubmitting}
//     >
//       {isSubmitting ? "Abrindo Edição" : "Editar figurinha 🪄"}
//     </button>
//   </Dialog.Trigger>

{
  /* <Dialog.Portal>
  <Dialog.Overlay className="bg-zinc-700/90 data-[state=open]:animate-overlayShow fixed inset-0" />
  <Dialog.Close asChild>
    <button
      className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
      aria-label="Close"
    >
      <CrossIcon />
    </button>
  </Dialog.Close>
  <Dialog.Content
    className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none grid sm:grid-cols-2 gap-2"
    asChild
  >
    {previewImagem && (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <ImageCrop previewImagem={previewImagem} {...crop} />
          <span className="block text-center text-sm text-zinc-700">
            {nameWatch && <strong>{nameWatch} - </strong>}{" "}
            <span className="text-zinc-500">figurinhaszap.com</span>
          </span>
        </div>
        <div className="flex flex-col gap-8 sm:gap-4">
          <Controller
            control={control}
            name="name"
            rules={{
              required: false,
              min: 3,
            }}
            render={(props) => (
              <div>
                <label
                  htmlFor={props.field.name}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nome do sticker
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    id={props.field.name}
                    className="block w-full ring-1 ring-inset ring-gray-300 border-0 rounded-md py-1.5 pr-10 sm:text-sm sm:leading-6"
                    placeholder="Seu nome"
                    {...props.field}
                  />
                </div>
              </div>
            )}
          />
          <div className="flex flex-col gap-4 w-full">
            <label
              htmlFor="zoom"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Zoom
            </label>
            <div className="flex gap-2">
              <FileImage />
              <input
                id="zoom"
                className="flex-1"
                type="range"
                min={1}
                step={0.25}
                max={5}
                onChange={(e) =>
                  crop.setZoom(Number(e.target.value))
                }
                value={crop.zoom}
              />
              <FileImage size="30" />
            </div>
          </div>
          <button
            type="submit"
            className="self-end w-full rounded bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed mt-0 sm:mt-[6.5rem]"
            onClick={() => {
              event({
                action: "upload_image",
                label: "envio de imagem",
                category: "upload",
                value: 1,
              });
            }}
            disabled={!isValid || isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? "Enviando ..." : "Enviar"}
          </button>
        </div>
      </form>
    )}
  </Dialog.Content>
</Dialog.Portal> 
</Dialog.Root>;*/
}
