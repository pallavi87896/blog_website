
export function generateSalt():Uint8Array{
    return crypto.getRandomValues(new Uint8Array(16))
}
export async function hashPassword(
    password:string,
    salt:Uint8Array
):Promise<Uint8Array>{
    const encoder=new TextEncoder()

    const key=await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        'PBKDF2',
        false,
        ['deriveBits']
    )

    const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt:salt.slice().buffer,
      iterations: 100_000,
      hash: 'SHA-256',
    },
    key,
    256
  )

  return new Uint8Array(derivedBits)

}

export function toBase64(data: Uint8Array): string {
  return btoa(String.fromCharCode(...data))
}

export function fromBase64(data: string): Uint8Array {
  return new Uint8Array(
    atob(data).split('').map(c => c.charCodeAt(0))
  )
}
