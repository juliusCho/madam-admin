const LayoutHeaderStyle = {
  container: `
    lg:h-36
    md:h-36
    sm:h-64
    py-4
    w-screen
    flex
    lg:flex-row
    md:flex-row
    sm:flex-col
    lg:justify-between
    md:justify-between
    sm:justify-center
    items-center
    bg-mono-pale
  `,
  modalContent: `
    bg-mono-white
    rounded-lg
    shadow-2xl
    p-4
    w-100
    h-36
  `,
  buttonArea: `
    lg:h-full
    flex
    lg:flex-row
    md:flex-row
    sm:flex-col
    lg:justify-end
    md:justify-end
    sm:justify-center
    items-center
    lg:mr-4
    md:mr-4
    sm:mr-0
  `,
  button: `
    shadow-md
    lg:h-12
    md:h-12
    sm:h-8
    lg:m-0
    md:m-0
    sm:m-2
  `,
  welcome: `
    lg:text-subTitleSmall
    md:text-subTitleSmall
    sm:text-textSmall
    lg:font-subTitleSmall
    md:font-subTitleSmall
    sm:font-textSmall
    text-mono-paleBlack
    lg:mt-1
    md:mt-1
    sm:mt-4
    lg:mr-4
    md:mr-4
    sm:mr-0
    lg:mb-0
    md:mb-0
    sm:mb-1
  `,
  adminName: `
    lg:text-subTitleBig
    md:text-subTitleBig
    sm:text-textBig
    lg:font-subTitleBig
    md:font-subTitleBig
    sm:font-textBig
    text-sub-darkPurple
    lg:mr-8
    md:mr-8
    sm:mr-0
    lg:mb-0
    md:mb-0
    sm:mb-2
  `,
}

export default LayoutHeaderStyle
