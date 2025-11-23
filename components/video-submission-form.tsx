"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { AlertInstructions } from "@/components/ui/alert-instructions"

interface Estado {
  id: number
  sigla: string
  nome: string
}

interface Cidade {
  id: number
  nome: string
}

export function VideoSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [locationType, setLocationType] = useState<"brasil" | "internacional">("brasil")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showUnderageAlert, setShowUnderageAlert] = useState(false)

  // Brazil location states
  const [estados, setEstados] = useState<Estado[]>([])
  const [cidades, setCidades] = useState<Cidade[]>([])
  const [selectedEstado, setSelectedEstado] = useState<string>("")
  const [selectedCidade, setSelectedCidade] = useState<string>("")
  const [loadingEstados, setLoadingEstados] = useState(false)
  const [loadingCidades, setLoadingCidades] = useState(false)

  // Form fields
  const [nomeCompleto, setNomeCompleto] = useState("")
  const [idade, setIdade] = useState("")
  const [internationalLocation, setInternationalLocation] = useState("")
  const [instagram, setInstagram] = useState("")
  const [tiktok, setTiktok] = useState("")
  const [videoLink, setVideoLink] = useState("")
  const [stance, setStance] = useState<"regular" | "goofy" | "">("")

  // Debounce for underage alert
  useEffect(() => {
    const ageNum = Number(idade)
    const isUnderage = ageNum > 0 && ageNum < 18

    // Immediate hide if not underage
    if (!isUnderage) {
      setShowUnderageAlert(false)
    }

    // Set a timer to show the alert after 2s if underage
    const handler = setTimeout(() => {
      if (isUnderage) {
        setShowUnderageAlert(true)
      }
    }, 2000)

    // Cleanup function to cancel the timer
    return () => {
      clearTimeout(handler)
    }
  }, [idade])

  // Fetch estados from IBGE API
  useEffect(() => {
    if (locationType === "brasil") {
      setLoadingEstados(true)
      fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then((res) => res.json())
        .then((data) => {
          setEstados(data)
          setLoadingEstados(false)
        })
        .catch((error) => {
          console.error("Error fetching estados:", error)
          alert("Erro ao carregar estados")
          setLoadingEstados(false)
        })
    }
  }, [locationType])

  // Fetch cidades when estado changes
  useEffect(() => {
    if (selectedEstado && locationType === "brasil") {
      setLoadingCidades(true)
      setCidades([])
      setSelectedCidade("")
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedEstado}/municipios?orderBy=nome`)
        .then((res) => res.json())
        .then((data) => {
          setCidades(data)
          setLoadingCidades(false)
        })
        .catch((error) => {
          console.error("Error fetching cidades:", error)
          alert("Erro ao carregar cidades")
          setLoadingCidades(false)
        })
    }
  }, [selectedEstado, locationType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!nomeCompleto.trim()) {
      alert("Por favor, preencha seu nome completo")
      return
    }

    const ageNum = Number(idade)
    if (!idade || !Number.isInteger(ageNum) || ageNum < 2 || ageNum > 130) {
      alert("Por favor, preencha uma idade válida (entre 2 e 130 anos)")
      return
    }

    if (locationType === "brasil" && (!selectedEstado || !selectedCidade)) {
      alert("Por favor, selecione estado e cidade")
      return
    }

    if (locationType === "internacional" && !internationalLocation.trim()) {
      alert("Por favor, preencha sua localização")
      return
    }

    if (!instagram.trim()) {
      alert("Por favor, preencha seu Instagram")
      return
    }

    if (!stance) {
      alert("Por favor, selecione sua base (Regular ou Goofy)")
      return
    }

    if (!videoLink.trim()) {
      alert("Por favor, preencha o link do vídeo")
      return
    }

    if (!termsAccepted) {
      alert("Por favor, aceite os termos de uso")
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare location string
      let address = ""
      if (locationType === "brasil") {
        const estadoNome = estados.find((e) => e.sigla === selectedEstado)?.nome || selectedEstado
        address = `Brasil, ${estadoNome}, ${selectedCidade}`
      } else {
        address = internationalLocation
      }

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nomeCompleto,
          idade: ageNum,
          address,
          instagram,
          tiktok,
          stance,
          link: videoLink,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit")
      }

      alert("Sucesso! Seu vídeo foi enviado e está na fila para narração.")

      // Reset form
      setNomeCompleto("")
      setIdade("")
      setInternationalLocation("")
      setInstagram("")
      setTiktok("")
      setVideoLink("")
      setSelectedEstado("")
      setSelectedCidade("")
      setStance("")
      setTermsAccepted(false)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Ocorreu um erro ao enviar. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-6 md:p-8">
      {/* Instruction Alert */}
      <AlertInstructions title="Instruções para prestar atenção">
        <ul className="space-y-2 text-sm">
          <li>
            <strong className="font-medium">Obrigatório:</strong>
            <ul className="list-disc list-inside pl-4 mt-1 space-y-1">
              <li>Pelo menos 3 manobras no vídeo</li>
              <li>Pelo menos 20 segundos de vídeo</li>
            </ul>
          </li>
          <li>
            <strong className="font-medium">Proibido:</strong>
            <ul className="list-disc list-inside pl-4 mt-1">
              <li>Cortes no video</li>
              <li>Marcas d'água no vídeo (nós já vamos colocar seu instagram e pedir colab)</li>
            </ul>
          </li>
          <li>
            <strong className="font-medium">Recomendado:</strong>
            <ul className="list-disc list-inside pl-4 mt-1">
              <li>Vídeo em 60fps para ficar mais liso</li>
            </ul>
          </li>
        </ul>
      </AlertInstructions>

      {/* Nome Completo */}
      <div className="space-y-2">
        <Label htmlFor="nome">Nome Completo</Label>
        <Input
          id="nome"
          type="text"
          placeholder="Seu nome completo"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
          required
        />
      </div>

      {/* Idade */}
      <div className="space-y-2">
        <Label htmlFor="idade">Idade</Label>
        <Input
          id="idade"
          type="number"
          placeholder="Sua idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
        />
      </div>

      {/* Underage Alert */}
      {showUnderageAlert && (
        <AlertInstructions title="Menor de idade">
          <p className="text-sm">Preciso confirmar com um responsável se podemos postar o video narrado.</p>
        </AlertInstructions>
      )}

      {/* Localização Type */}
      <div className="space-y-3">
        <Label>Localização</Label>
        <RadioGroup
          value={locationType}
          onValueChange={(value) => setLocationType(value as "brasil" | "internacional")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="brasil" id="brasil" />
            <Label htmlFor="brasil" className="font-normal cursor-pointer">
              Brasil
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="internacional" id="internacional" />
            <Label htmlFor="internacional" className="font-normal cursor-pointer">
              Internacional
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Brazil Location Fields */}
      {locationType === "brasil" && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="estado">Estado</Label>
            <Select value={selectedEstado} onValueChange={setSelectedEstado} disabled={loadingEstados}>
              <SelectTrigger id="estado">
                <SelectValue placeholder={loadingEstados ? "Carregando..." : "Selecione o estado"} />
              </SelectTrigger>
              <SelectContent>
                {estados.map((estado) => (
                  <SelectItem key={estado.id} value={estado.sigla}>
                    {estado.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade</Label>
            <Select
              value={selectedCidade}
              onValueChange={setSelectedCidade}
              disabled={!selectedEstado || loadingCidades}
            >
              <SelectTrigger id="cidade">
                <SelectValue placeholder={loadingCidades ? "Carregando..." : "Selecione a cidade"} />
              </SelectTrigger>
              <SelectContent>
                {cidades.map((cidade) => (
                  <SelectItem key={cidade.id} value={cidade.nome}>
                    {cidade.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* International Location Field */}
      {locationType === "internacional" && (
        <div className="space-y-2">
          <Label htmlFor="international-location">País, Estado e Cidade</Label>
          <Input
            id="international-location"
            type="text"
            placeholder="Ex: Estados Unidos, Califórnia, Los Angeles"
            value={internationalLocation}
            onChange={(e) => setInternationalLocation(e.target.value)}
            required
          />
        </div>
      )}

      {/* Instagram */}
      <div className="space-y-2">
        <Label htmlFor="instagram">@ do Instagram</Label>
        <Input
          id="instagram"
          type="text"
          placeholder="@seuperfil"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          required
        />
      </div>

      {/* TikTok */}
      <div className="space-y-2">
        <Label htmlFor="tiktok">@ do Tiktok (opcional)</Label>
        <Input
          id="tiktok"
          type="text"
          placeholder="@seuperfil"
          value={tiktok}
          onChange={(e) => setTiktok(e.target.value)}
        />
      </div>

      {/* Stance */}
      <div className="space-y-2">
        <Label htmlFor="stance">Base</Label>
        <Select value={stance} onValueChange={(value) => setStance(value as "regular" | "goofy")}>
          <SelectTrigger id="stance">
            <SelectValue placeholder="Selecione sua base" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regular">Regular (pé esquerdo na frente)</SelectItem>
            <SelectItem value="goofy">Goofy (pé direito na frente)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Video Link */}
      <div className="space-y-2">
        <Label htmlFor="video-link">Link do vídeo no Google Drive</Label>
        <Input
          id="video-link"
          type="url"
          placeholder="https://drive.google.com/..."
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          required
        />
        <p className="text-sm text-muted-foreground">
          Certifique-se de que o vídeo está com permissão de acesso para &quot;Qualquer pessoa com o link&quot;
        </p>
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
        />
        <Label htmlFor="terms" className="font-normal leading-relaxed cursor-pointer">
          Eu aceito os{" "}
          <Link href="/terms" className="text-primary hover:underline" target="_blank">
            termos de uso
          </Link>{" "}
          e autorizo o uso da minha imagem
        </Label>
      </div>

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar Vídeo"
        )}
      </Button>
    </form>
  )
}
