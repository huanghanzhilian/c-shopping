import Image from 'next/image'

const blurDataURL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS4AAACnAgMAAADS5ll0AAAADFBMVEX09PTa2trd3d3n5+fDnyYAAAACOUlEQVRo3u2Xv2vbQBSAnyMy1KXu1CHZU2h2Zyz+I/LO1sVQLx6kLPcn+E/Icm4VMmRRSpRCAx0TiiBzRhfqPUOgUC8d+gv6zlYdaX6vS3kfHnyDPj7dybozgKIoiqIoiqIoiqIo/56nX+RcL3EopYru0b6RysoR04GM64dNSLYvMvM5pjaxv/sSt2g8ptOLssWXRXfWekyuAVqWneVjLLxd0NcNw8z6jh7N2fvVgCl7dFYg2l+VOebJOpj7w3XmOVPmzfXDKCtZsta0fv3xhCXbeF0fMcuaT8N8wpYVa3xaFD3Gc4YA2IAjM6WcDLCEuCFzDJkn2cOkFReeUzadQFx/IGYc2SdJGV1sxWRbDuKb2vSzZNuOyjIcr2Wc1dweUVmG30TKnp+GsmHkJWR7R6HMwUxC1j2isuMebJEpzgxPtjmkMnop7gZZjGwZla1kH3LDW832IJQ5+IyYwHzKK3syCKs5AlrNt7DHle2H1TzskOwddLiy/vIXQJhLiJiy1sHyFxCg3cT3eDKzLqPRLm81aXuqysIZtM27TTqsVGWj0MmUJVVZHCwRTwZ5WZUt37cLnmxcrsr6Aq9tKCZUNr5NTiqZ48mo7IAeV4myeShz0C0lZDMX39BmF/3d4VmyZ86WJ0L7JuxQ2aWU7MWouaOzVnPntHHW4M1Z95XcWQO6Y7lTEGymgmVtnwvKivOrrx9/Vp8rz1rNx4usdjw2rNM2CP4PEJcVDRwoiqIoiqIoiqIoiqL8h/wB6OAranSrxR0AAAAASUVORK5CYII='

export default function ResponsiveImage(props) {
  //? Props
  const { dimensions, className, src, alt, imageStyles, ...rest } = props

  //? Render(s)
  return (
    <div
      className={`relative ${dimensions ? dimensions : ''} ${className ? className : ''}`}
      title={alt}
    >
      <Image
        src={src}
        alt={alt}
        className={imageStyles}
        placeholder="blur"
        blurDataURL={blurDataURL}
        quality="100"
        fill
        {...rest}
      />
    </div>
  )
}
