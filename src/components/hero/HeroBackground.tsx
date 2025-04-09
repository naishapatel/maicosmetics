
export const HeroBackground = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-mai-sand via-mai-cream to-white opacity-70" />
      
      {/* Subtle geometric shapes */}
      <div
        className="absolute top-20 right-[20%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-mai-mauve/5 to-mai-blushPink/10 blur-3xl"
      />
      
      <div
        className="absolute bottom-20 left-[10%] w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-mai-mauve/10 to-mai-blushPink/5 blur-3xl"
      />
    </>
  );
};
