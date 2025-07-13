// app.ts
import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import obrasRoutes from './routes/obrasRoutes'
import biografiaRoutes from './routes/biografiaRoutes'
import exposicionesRoutes from './routes/expoRoutes'
import path from 'path'

const app = express()

// Middlewares globales
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Rutas
app.use('/api/obras', obrasRoutes)
app.use('/api/biografia', biografiaRoutes)
app.use('/api/expo', exposicionesRoutes)

// Ruta base
app.get('/', (req: Request, res: Response) => {
  res.send('🎨 API de Portfolio - Iara Fenley')
})

// Manejo de rutas no encontradas
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

// Manejo de errores generales
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error inesperado:', err)
  res.status(500).json({ error: 'Error interno del servidor' })
})

// Servir imagenes estaticas desde /uploads
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

export default app
