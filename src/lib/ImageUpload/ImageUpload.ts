export const imageUpload = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  const hostUrl = data?.data?.url;

  return hostUrl;
};
