export async function sleep(miliseconds: number) : Promise<void> {
    if(process.env.NODE_ENV == 'production') return;
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}