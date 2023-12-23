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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { writeFile, utils } from "xlsx";

import { calculateCosineSimilarity } from "./SimilarityScore";
import { calculateCosineSimilaritymatrix } from "./matrix";


export default function Main() {
  const [loading, setLoading] = useState(false);
  const [sourceSentence, setSourceSentence] = useState("");
  const [sentenceToCompare, setSentenceToCompare] = useState("");
  const [similarityscore, setsimilarityscore] = useState("");
  const [exceptionsentence, setexceptionsentence] = useState("");
  const [result, setresult] = useState([]);
  const [headerarray, setheader] = useState("");
  const [numTextAreas, setNumTextAreas] = useState(1); // Initial number of text areas
  const [outcomes, setOutcomes] = useState(Array.from({ length: 1 }, () => "")); 

  const handleAnalyzeClick = async () => {
    try {
      setLoading(true);
      const result = await calculateCosineSimilarity(
        sourceSentence,
        sentenceToCompare
      );
      setsimilarityscore(result);
      // Handle the result as needed
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };
  const handleAnalyzeClick2 = async () => {
    try {
      console.log(outcomes)
      const result = await calculateCosineSimilaritymatrix(outcomes);
      setresult(result);
      const headerArray = result[0][0];
      console.log(headerArray)
      setheader(headerArray);
      console.log(result);
      // Handle the result as needed
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  const increaseTextAreas = () => {
    setNumTextAreas(numTextAreas + 1);
     setOutcomes([...outcomes, ""]);
  };

  const decreaseTextAreas = () => {
    if (numTextAreas > 1) {
      setNumTextAreas(numTextAreas - 1);
      setOutcomes(outcomes.slice(0, -1)); 
    }
  };

  const handleOutcomeChange = (index, value) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    setOutcomes(newOutcomes);
  };

  // function writeToExcel(result, fileName) {
  //   const worksheet = utils.aoa_to_sheet(result);
  //   const workbook = utils.book_new();
  //   utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //   writeFile(workbook, fileName);
  // }
  function writeToExcel(result, fileName) {
    const workbook = utils.book_new();

    // Iterate over each array of arrays in result
    result.forEach((innerArray, index) => {
      const worksheet = utils.aoa_to_sheet(innerArray);

      // Append the worksheet to the workbook
      utils.book_append_sheet(workbook, worksheet, `Sheet${index + 1}`);

      // Add an empty row after each inner array, except for the last one
      if (index < result.length - 1) {
        utils.sheet_add_aoa(worksheet, [[]]);
      }
    });

    // Write the workbook to the file
    writeFile(workbook, fileName);
  }


  return (
    <Tabs
      defaultValue="standard"
      className="w-[350px] mx-auto  my-auto pt-12 lg:w-[500px]"
    >
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
                    Likeness Index : {similarityscore}
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

          <CardContent className="space-y-3">
            {[...Array(numTextAreas)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-1.5">
                <Label htmlFor={`outcome${index + 1}`}>{`course ${
                  index + 1
                }:`}</Label>
                <Textarea
                  id={`outcome${index + 1}`}
                  value={outcomes[index] || ""}
                  onChange={(e) => handleOutcomeChange(index, e.target.value)}
                />
              </div>
            ))}
            <div className="flex justify-between mt-2">
              <Button variant="ghost" onClick={decreaseTextAreas}>
                -
              </Button>

              <Button variant="ghost" onClick={increaseTextAreas}>
                +
              </Button>
            </div>
          </CardContent>

          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" onClick={handleAnalyzeClick2}>
                  Analyze
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[400px] overflow-y-auto sm:max-w-[425px] ">
                <DialogHeader>
                  <DialogTitle>PO.</DialogTitle>
                </DialogHeader>

                {result.map((dataArray, index) => (
                  <DynamicTable key={index} data={dataArray} />
                ))}

                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() => writeToExcel(result, "CourseOutcomes.xlsx")}
                  >
                    SaveAS.xlsx
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
