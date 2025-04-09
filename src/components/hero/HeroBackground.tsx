
export const HeroBackground = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-mai-mauve/20 via-mai-cream to-white opacity-80" />
      
      {/* Enhanced geometric shapes with more mauve */}
      <div
        className="absolute top-20 right-[20%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-mai-mauve/20 to-mai-blushPink/15 blur-3xl"
      />
      
      <div
        className="absolute bottom-20 left-[10%] w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-mai-mauve/25 to-mai-blushPink/10 blur-3xl"
      />
      
      {/* Additional mauve accent */}
      <div
        className="absolute top-[40%] left-[25%] w-[20rem] h-[20rem] rounded-full bg-gradient-to-tr from-mai-mauveDark/10 to-mai-mauve/5 blur-3xl"
      />
    </>
  );
};
