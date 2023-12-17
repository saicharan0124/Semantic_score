"use client";
import React, { useState } from "react";
import performTextSimilarityPrediction from "./SimilarityScore";
import { Button } from "@/components/ui/button";
import { DynamicTable } from "./table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { calculateCosineSimilarity } from "./SimilarityScore";
import { calculateCosineSimilaritymatrix } from "./matrix";


export default function Main() {
  const [loading, setLoading] = useState(false);
  const [sourceSentence, setSourceSentence] = useState("");
  const [sentenceToCompare, setSentenceToCompare] = useState("");
  const[similarityscore,setsimilarityscore]=useState("")
  const[exceptionsentence,setexceptionsentence]=useState("")
  const[result,setresult]=useState("")
  const [headerarray, setheader] = useState("");
  const handleAnalyzeClick = async () => {
    try {
      setLoading(true);
      const result = await calculateCosineSimilarity(
        sourceSentence,
        sentenceToCompare
      );
      setsimilarityscore(result * 100);
      // Handle the result as needed
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };
    const handleAnalyzeClick2 = async () => {
    try {
      const result = await calculateCosineSimilaritymatrix(exceptionsentence)
      setresult(result)
      const headerArray = result[0];
      setheader(headerArray)
      console.log(result)
      // Handle the result as needed
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
    
  };
  
  return (
    <Tabs defaultValue="standard" className="w-[400px] mx-auto pt-12">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="standard">Standard</TabsTrigger>
        <TabsTrigger value="exception">Exception</TabsTrigger>
      </TabsList>
      <TabsContent value="standard">
        <Card>
          <CardHeader>
            <CardTitle>Semantic Score</CardTitle>
            <CardDescription>
              Textual similarity checks, simplified!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="source">Source sentence</Label>
              <Input
                id="source"
                placeholder="Enter source sentence"
                type="text"
                value={sourceSentence}
                onChange={(e) => setSourceSentence(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="sentence">Sentence to compare</Label>
              <Input
                id="sentence"
                placeholder="Enter sentence to compare"
                type="text"
                value={sentenceToCompare}
                onChange={(e) => setSentenceToCompare(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <AlertDialog>
            
              <AlertDialogTrigger asChild>
                <Button className="w-full" onClick={handleAnalyzeClick}>
                  Analyze
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Likeness Index : {similarityscore}%
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Ok!</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="exception">
        <Card>
          <CardHeader>
            <CardTitle>Compare.</CardTitle>
            <CardDescription>Comparing with Program Outcomes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="message">Sentences to compare</Label>
              <Textarea
                placeholder="seperate each sentence by new line."
                id="message"
                value={exceptionsentence}
                onChange={(e) => setexceptionsentence(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" onClick={handleAnalyzeClick2}>
                  Analyze
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>PO.</DialogTitle>
                </DialogHeader>
                <DynamicTable headers={headerarray} data={result} />

                <DialogFooter>
                  <Button type="submit">Ok!</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
