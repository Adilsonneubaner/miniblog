import { useState, useEffect, useReducer } from "react";
import {app, db} from '../firebase/config'
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading: true, error: null}
        case "DELETED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const useDeleteDocument = (docCollection) => {
    
    const [response, dispatch] = useReducer(deleteReducer, initialState)

    const  ActionForDispatch = (action) => {
        dispatch(action)
    }

    const deleteDocument = async (id) => {
        ActionForDispatch({
            type: 'LOADING'
        })

        try {
            const deleteDocument = await deleteDoc(doc(db ,docCollection, id))

            ActionForDispatch({
                type: 'DELETED_DOC',
                payload: deleteDocument
            })

        } catch (error) {
            ActionForDispatch({
                type: 'ERROR',
                payload: error.message
            })

        }

    }


    return {deleteDocument, response}
}