import { pinecone } from '@/utils/pinecone-client';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';


export const deleteIndex = async () => {
    try {
        const list = await pinecone.listIndexes();
        console.log("Index: ", list);
        
        if (list.length > 0) {
        const resDel = await pinecone.deleteIndex({
            indexName: PINECONE_INDEX_NAME,
        });
        console.log("resDel: ", resDel);
        }else{
            console.log('No existe ningun indice')
        }
    } catch (error) { 
        console.log('Error de Pinecone: ', error);
        throw new Error('Error al recuperar tus datos');
    }
}

export const createIndex = async () => {
    try {
        const list = await pinecone.listIndexes();
        console.log("Index: ", list);
        
        if (!list.includes(PINECONE_INDEX_NAME)) {
            const resCreate = await pinecone.createIndex({
                createRequest: {
                  name: PINECONE_INDEX_NAME,
                  dimension: 1536,
                  metric: "cosine"
                },
              });
          
              console.log("resCreate: ", resCreate);
        }else{
            console.log('El indice ya existe');
        }
    } catch (error) { 
        console.log('Error de Pinecone: ', error);
        throw new Error('Error al recuperar tus datos');
    }
}
